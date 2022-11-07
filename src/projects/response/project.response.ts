import { CollectionResponse } from 'src/common/response/collection.response';
import { TechnologyEntity } from 'src/technologies/entities/technology.entity';
import { ProjectEntity } from '../entities/project.entity';

export class ProjectResponse extends ProjectEntity {
  technologies: TechnologyEntity[];
}

export class GetProjectResponse extends CollectionResponse<ProjectResponse> {
  data: ProjectResponse[];
}
