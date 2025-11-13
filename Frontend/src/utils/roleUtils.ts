// Role-based access control utilities

export const hasAccessToPage = (userRole: string, page: string): boolean => {
  const rolePermissions: Record<string, string[]> = {
    user: ['overview'],
    moderator: ['overview', 'products', 'blogs', 'settings'],
    admin: ['overview', 'products', 'blogs', 'users', 'settings'] // admin can access everything
  };

  // For admin, allow access to all pages
  if (userRole === 'admin') {
    return true;
  }

  // Check if user's role has permission for the requested page
  const allowedPages = rolePermissions[userRole] || [];
  return allowedPages.includes(page.toLowerCase());
};

export const canAccessDashboard = (userRole: string): boolean => {
  return ['user', 'moderator', 'admin'].includes(userRole);
};

export const getAllowedPages = (userRole: string): string[] => {
  const rolePermissions: Record<string, string[]> = {
    user: ['overview'],
    moderator: ['overview', 'products', 'blogs', 'settings'],
    admin: ['overview', 'products', 'blogs', 'users', 'settings']
  };

  return rolePermissions[userRole] || [];
};