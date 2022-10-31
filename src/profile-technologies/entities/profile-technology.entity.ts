import { ProfileTechnology } from '@prisma/client';

export class ProfileTechnologyEntity implements ProfileTechnology {
  id: string;
  createdAt: Date;
  updateAt: Date;
  yoe: number;
  profileId: string;
  technologyId: string;
}
