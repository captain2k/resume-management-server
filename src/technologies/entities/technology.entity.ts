import { Technology } from '@prisma/client';

export class TechnologyEntity implements Technology {
  id: string;

  name: string;
}
