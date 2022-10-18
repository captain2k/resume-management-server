import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  createdAt: Date;
  updateAt: Date;
}
