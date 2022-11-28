import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { SprintService } from 'src/services/sprint.service';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post('/')
  @FormDataRequest()
  async create(@Body() payload: any) {
    return await this.sprintService.create(payload);
  }

  @Get('/')
  async getList(): Promise<any> {
    return await this.sprintService.getList();
  }
}
