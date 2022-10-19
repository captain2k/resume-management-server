import { CollectionResponse } from 'src/common/response/collection.response';
import { ProjectResponse } from 'src/projects/response/project.response';
import { TechnologyEntity } from 'src/technologies/entities/technology.entity';
import { WorkingHistoryEntity } from '../entities/working-history.entities';

export class WorkingHistoryResponse extends WorkingHistoryEntity {
  project: ProjectResponse;
  technologies: TechnologyEntity[];
}

export class GetWorkingHistoryRespose extends CollectionResponse<WorkingHistoryResponse> {
  data: WorkingHistoryResponse[];
}
