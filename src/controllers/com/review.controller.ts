import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import ReviewDto from 'src/dto/review.dto';
import { ReviewService } from 'src/services/review.service';

@Public()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/product/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return await this.reviewService.getByProduct(productId);
  }

  @Get()
  async get() {
    return await this.reviewService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.reviewService.findById(id);
  }

  @Post()
  async create(@Body() payload: ReviewDto) {
    return await this.reviewService.create(payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.reviewService.delete(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body) {
    return await this.reviewService.update(id, body.isPublish);
  }
}
