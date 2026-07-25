import { Router } from 'express';
import authRoutes from './auth.routes';
import serviceRoutes from './service.routes';
import categoryRoutes from './category.routes';
import portfolioRoutes from './portfolio.routes';
import galleryRoutes from './gallery.routes';
import mediaRoutes from './media.routes';
import seoRoutes from './seo.routes';
import { testimonialRouter, clientRouter, faqRouter } from './content.routes';
import { homepageRouter, settingsRouter } from './site.routes';
import { contactRouter, quoteRouter } from './inquiry.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/categories', categoryRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/gallery', galleryRoutes);
router.use('/testimonials', testimonialRouter);
router.use('/clients', clientRouter);
router.use('/faqs', faqRouter);
router.use('/media', mediaRoutes);
router.use('/seo', seoRoutes);
router.use('/homepage', homepageRouter);
router.use('/settings', settingsRouter);
router.use('/contact', contactRouter);
router.use('/quotes', quoteRouter);

export default router;
