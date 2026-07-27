import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '@/config/env';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manas Advertising API',
      version: '1.0.0',
      description: 'CMS backend for Manas Advertising — services, portfolio, gallery, testimonials, media, enquiries.',
    },
    servers: [{ url: `http://localhost:${env.PORT}${env.API_BASE_PATH}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
});
