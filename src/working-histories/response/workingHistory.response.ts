import { CollectionResponse } from 'src/common/response/collection.response';
import { WorkingHistoryEntity } from '../entities/workingHistory.entities';

export class WorkingHistoryResponse extends WorkingHistoryEntity {}

export class GetWorkingHistoryRespose extends CollectionResponse<WorkingHistoryResponse> {
  data: WorkingHistoryResponse[];
}
