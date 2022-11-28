import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ProjectService } from 'src/services/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async get(): Promise<any> {
    return await this.projectService.getList();
  }

  @Post()
  @FormDataRequest()
  async create(@Body() payload: any) {
    return await this.projectService.create(payload);
  }

  @Delete('/:id')
  async delete(@Body() payload: any) {
    return await this.projectService.delete(payload);
  }

  @Put('/:id')
  @FormDataRequest()
  async update(@Body() payload: any) {
    return await this.projectService.update(payload);
  }
}
