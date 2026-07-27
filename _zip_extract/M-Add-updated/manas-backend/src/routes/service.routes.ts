import { Router } from 'express';
import prisma from '@/database/prisma';
import { createCrudService } from '@/services/crudFactory';
import { createCrudController } from '@/controllers/crudFactory';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import {
  listServicesSchema, createServiceSchema, updateServiceSchema, serviceIdSchema,
} from '@/validators/service.validator';

const router = Router();

const service = createCrudService({
  resourceName: 'Service',
  delegate: prisma.service,
  searchableFields: ['title', 'description'],
  uniqueField: 'slug',
});
const controller = createCrudController(service);

// Public reads — frontend consumes these without auth.
router.get('/', validate(listServicesSchema), controller.list);
router.get('/:id', validate(serviceIdSchema), controller.getById);

// Protected writes.
router.post('/', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(createServiceSchema), controller.create);
router.put('/:id', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(updateServiceSchema), controller.update);
router.delete('/:id', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(serviceIdSchema), controller.remove);

export default router;
