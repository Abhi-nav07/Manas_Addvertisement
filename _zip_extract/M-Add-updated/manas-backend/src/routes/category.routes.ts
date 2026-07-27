import { Router } from 'express';
import prisma from '@/database/prisma';
import { createCrudService } from '@/services/crudFactory';
import { createCrudController } from '@/controllers/crudFactory';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import {
  listCategoriesSchema, createCategorySchema, updateCategorySchema, categoryIdSchema,
} from '@/validators/category.validator';

const router = Router();
const service = createCrudService({ resourceName: 'Category', delegate: prisma.category, searchableFields: ['name'], uniqueField: 'slug' });
const controller = createCrudController(service);

router.get('/', validate(listCategoriesSchema), controller.list);
router.get('/:id', validate(categoryIdSchema), controller.getById);
router.post('/', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(createCategorySchema), controller.create);
router.put('/:id', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(updateCategorySchema), controller.update);
router.delete('/:id', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), validate(categoryIdSchema), controller.remove);

export default router;
