import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: string;
  introduction: string | null;
  userId: string;
}
