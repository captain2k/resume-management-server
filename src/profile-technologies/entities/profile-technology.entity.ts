import { ProfileTechnology } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ProfileTechnologyEntity implements ProfileTechnology {
  id: string;
  yoe: Decimal;
  profileId: string;
  technologyId: string;
}
