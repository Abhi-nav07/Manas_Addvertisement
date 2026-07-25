export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  CONTENT_MANAGER: 'content_manager',
} as const;

// key format: "<resource>.<action>" — checked by the RBAC middleware.
export const PERMISSIONS = {
  SERVICES_MANAGE: 'services.manage',
  PORTFOLIO_MANAGE: 'portfolio.manage',
  GALLERY_MANAGE: 'gallery.manage',
  TESTIMONIALS_MANAGE: 'testimonials.manage',
  CLIENTS_MANAGE: 'clients.manage',
  FAQ_MANAGE: 'faq.manage',
  HOMEPAGE_MANAGE: 'homepage.manage',
  SETTINGS_MANAGE: 'settings.manage',
  MEDIA_MANAGE: 'media.manage',
  ENQUIRIES_MANAGE: 'enquiries.manage',
  ADMINS_MANAGE: 'admins.manage',
} as const;

// Default role -> permission matrix, used by the seed script.
export const ROLE_PERMISSION_MATRIX: Record<string, string[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: Object.values(PERMISSIONS).filter((p) => p !== PERMISSIONS.ADMINS_MANAGE),
  [ROLES.EDITOR]: [
    PERMISSIONS.SERVICES_MANAGE,
    PERMISSIONS.PORTFOLIO_MANAGE,
    PERMISSIONS.GALLERY_MANAGE,
    PERMISSIONS.TESTIMONIALS_MANAGE,
    PERMISSIONS.FAQ_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
  ],
  [ROLES.CONTENT_MANAGER]: [
    PERMISSIONS.HOMEPAGE_MANAGE,
    PERMISSIONS.FAQ_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
  ],
};
