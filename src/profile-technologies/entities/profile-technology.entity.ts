import { ProfileTechnology } from '@prisma/client';

export class ProfileTechnologyEntity implements ProfileTechnology {
  id: string;
  yoe: number;
  profileId: string;
  technologyId: string;
}
