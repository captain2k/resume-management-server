import { WorkingHistory } from '@prisma/client';

export class WorkingHistoryEntity implements WorkingHistory {
  id: string;
  role: string;
  responsibilities: string;
  createdAt: Date;
  updateAt: Date;
  projectId: string;
  profileId: string;
}
