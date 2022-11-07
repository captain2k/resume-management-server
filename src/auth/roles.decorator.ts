import { SetMetadata } from '@nestjs/common';
import { Roles as PRoles } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: PRoles[]) => SetMetadata(ROLES_KEY, roles);
