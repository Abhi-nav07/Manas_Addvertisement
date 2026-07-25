import bcrypt from 'bcryptjs';
import prisma from '@/database/prisma';
import { ROLES, PERMISSIONS, ROLE_PERMISSION_MATRIX } from '@/constants/roles';

async function main() {
  // 1. Permissions
  const permissionRecords = await Promise.all(
    Object.values(PERMISSIONS).map((key) =>
      prisma.permission.upsert({ where: { key }, update: {}, create: { key } }),
    ),
  );
  const permissionByKey = new Map(permissionRecords.map((p) => [p.key, p.id]));

  // 2. Roles + role-permission links
  for (const roleName of Object.values(ROLES)) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });

    const grantedKeys = ROLE_PERMISSION_MATRIX[roleName] ?? [];
    for (const key of grantedKeys) {
      const permissionId = permissionByKey.get(key)!;
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId } },
        update: {},
        create: { roleId: role.id, permissionId },
      });
    }
  }

  // 3. Super admin bootstrap account
  const superAdminRole = await prisma.role.findUniqueOrThrow({ where: { name: ROLES.SUPER_ADMIN } });
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!', 12);

  await prisma.admin.upsert({
    where: { email: 'admin@manasadvertising.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@manasadvertising.com',
      password: passwordHash,
      roleId: superAdminRole.id,
    },
  });

  // eslint-disable-next-line no-console
  console.log('✅ Seed complete. Login: admin@manasadvertising.com / (SEED_ADMIN_PASSWORD or ChangeMe123!)');
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
