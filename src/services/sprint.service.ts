import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Sprint } from 'src/entities/pm/sprint.entity';

interface SprintDto {
  title: string;
  logo: any;
}

@Injectable()
export class SprintService {
  constructor(private dataSource: DataSource) {}
  sprintRepository = this.dataSource.getRepository(Sprint);

  async create(payload: SprintDto): Promise<any> {
    const { title, logo } = payload;

    // try {
    //   //Create new image
    //   const image = await this.imageRepository.save({
    //     url: 'files/' + logo.originalName
    //   });

    //   //Link project to image
    //   const sprint = await this.sprintRepository.save({ title, logo: image });

    //   //Upload file
    //   saveFile(logo.originalName, logo.buffer);

    //   return sprint;
    // } catch (error) {
    //   console.log('err ', error);
    // }
  }

  async getList(): Promise<any[]> {
    return await this.sprintRepository.find();
  }

  // async update(payload: any): Promise<any> {
  //   const { title, logo, id, logoId } = payload;

  //   await this.imageRepository.update(logoId, {
  //     url: '/image/download/' + logo.originalName
  //   });

  //   const sprint = await this.sprintRepository.update(id, { title });

  //   saveFile(logo.originalName, logo.buffer);

  //   return sprint;
  // }

  // async delete(payload: any): Promise<any> {
  //   const { id, logoId } = payload;

  //   await this.imageRepository.delete(logoId);
  //   return await this.sprintRepository.delete(id);
  // }
}
