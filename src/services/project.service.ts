import { Injectable } from '@nestjs/common';
import { Project } from 'src/entities/pm/project.entity';
import { DataSource } from 'typeorm';
import { saveFile } from 'src/utils/file';
import { makeSlug } from 'src/utils/url';

interface ProjectDto {
  title: string;
  logo: any;
}

@Injectable()
export class ProjectService {
  constructor(private dataSource: DataSource) {}
  projectRepository = this.dataSource.getRepository(Project);
  // imageRepository = this.dataSource.getRepository(Image);

  async create(payload: ProjectDto): Promise<any> {
    const { title, logo } = payload;
    try {
      //Create new image
      // const image = await this.imageRepository.save({
      //   url: '/image/download/' + logo.originalName
      // });

      //Link project to image
      const project = await this.projectRepository.save({ title });

      //Upload file
      saveFile(makeSlug(title), logo);

      return project;
    } catch (error) {
      console.log('err ', error);
    }
  }

  async getList(): Promise<any[]> {
    return await this.projectRepository.find();
  }

  async update(payload: any): Promise<any> {
    const { title, logo, id, logoId } = payload;

    // await this.imageRepository.update(logoId, {
    //   url: '/image/download/' + logo.originalName
    // });

    const project = await this.projectRepository.update(id, { title });

    saveFile(makeSlug(title), logo.buffer);

    return project;
  }

  async delete(payload: any): Promise<any> {
    const { id, logoId } = payload;

    // await this.imageRepository.delete(logoId);
    return await this.projectRepository.delete(id);
  }
}
