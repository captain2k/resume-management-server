import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: string;
  createdAt: Date;
  updateAt: Date;
  introduction: string | null;
  userId: string;
}
