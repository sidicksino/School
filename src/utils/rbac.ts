export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export type Role = 'admin' | 'teacher' | 'student';

export const PERMISSIONS = {
    [UserRole.ADMIN]: {
        canManageUsers: true,
        canManageCourses: true,
        canManageGrades: true,
        canViewAllGenerics: true,
    },
    [UserRole.TEACHER]: {
        canManageUsers: false,
        canManageCourses: false, // Usually read-only or limited to their own
        canManageGrades: true,
        canViewAllGenerics: true,
    },
    [UserRole.STUDENT]: {
        canManageUsers: false,
        canManageCourses: false,
        canManageGrades: false,
        canViewAllGenerics: false, // Restricted to own class
    },
};

export const hasRole = (userRole: string | undefined, allowedRoles: Role[]): boolean => {
    if (!userRole) return false;
    return allowedRoles.includes(userRole as Role);
};
