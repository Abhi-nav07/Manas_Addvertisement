import { Router } from 'express';
import prisma from '@/database/prisma';
import { createCrudService } from '@/services/crudFactory';
import { createCrudController } from '@/controllers/crudFactory';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import {
  listTestimonialsSchema, createTestimonialSchema, updateTestimonialSchema, testimonialIdSchema,
  listClientsSchema, createClientSchema, updateClientSchema, clientIdSchema,
  listFaqsSchema, createFaqSchema, updateFaqSchema, faqIdSchema,
} from '@/validators/content.validator';

// ── Testimonials ──
export const testimonialRouter = Router();
const testimonialService = createCrudService({ resourceName: 'Testimonial', delegate: prisma.testimonial, searchableFields: ['clientName', 'message'] });
const testimonialController = createCrudController(testimonialService);
testimonialRouter.get('/', validate(listTestimonialsSchema), testimonialController.list);
testimonialRouter.get('/:id', validate(testimonialIdSchema), testimonialController.getById);
testimonialRouter.post('/', authenticate, requirePermission(PERMISSIONS.TESTIMONIALS_MANAGE), validate(createTestimonialSchema), testimonialController.create);
testimonialRouter.put('/:id', authenticate, requirePermission(PERMISSIONS.TESTIMONIALS_MANAGE), validate(updateTestimonialSchema), testimonialController.update);
testimonialRouter.delete('/:id', authenticate, requirePermission(PERMISSIONS.TESTIMONIALS_MANAGE), validate(testimonialIdSchema), testimonialController.remove);

// ── Clients ──
export const clientRouter = Router();
const clientService = createCrudService({ resourceName: 'Client', delegate: prisma.client, searchableFields: ['name'] });
const clientController = createCrudController(clientService);
clientRouter.get('/', validate(listClientsSchema), clientController.list);
clientRouter.get('/:id', validate(clientIdSchema), clientController.getById);
clientRouter.post('/', authenticate, requirePermission(PERMISSIONS.CLIENTS_MANAGE), validate(createClientSchema), clientController.create);
clientRouter.put('/:id', authenticate, requirePermission(PERMISSIONS.CLIENTS_MANAGE), validate(updateClientSchema), clientController.update);
clientRouter.delete('/:id', authenticate, requirePermission(PERMISSIONS.CLIENTS_MANAGE), validate(clientIdSchema), clientController.remove);

// ── FAQ ──
export const faqRouter = Router();
const faqService = createCrudService({ resourceName: 'Faq', delegate: prisma.faq, searchableFields: ['question', 'answer'], defaultSortField: 'order' });
const faqController = createCrudController(faqService);
faqRouter.get('/', validate(listFaqsSchema), faqController.list);
faqRouter.get('/:id', validate(faqIdSchema), faqController.getById);
faqRouter.post('/', authenticate, requirePermission(PERMISSIONS.FAQ_MANAGE), validate(createFaqSchema), faqController.create);
faqRouter.put('/:id', authenticate, requirePermission(PERMISSIONS.FAQ_MANAGE), validate(updateFaqSchema), faqController.update);
faqRouter.delete('/:id', authenticate, requirePermission(PERMISSIONS.FAQ_MANAGE), validate(faqIdSchema), faqController.remove);
