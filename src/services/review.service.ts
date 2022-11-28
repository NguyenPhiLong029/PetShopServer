import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';
import ReviewDto from 'src/dto/review.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from 'src/entities/com/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  reviewRepository = this.dataSource.getRepository(Review);

  async getByProduct(productId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { product: { id: productId }, isPublish: true },
      order: {
        _createdDate: 'DESC'
      }
    });
  }

  async create(payload: ReviewDto) {
    return this.reviewRepository.save({
      ...payload,
      product: {
        id: payload.productId
      },
      isPublish: false
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.reviewRepository.delete(id);
  }

  async getAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: {
        product: true
      },
      select: {
        product: {
          id: true,
          title: true
        }
      }
    });
  }

  async findById(id: string): Promise<Review> {
    return this.reviewRepository.findOneBy({ id });
  }

  async update(id: string, isPublish: boolean): Promise<UpdateResult> {
    return this.reviewRepository.update(id, {
      isPublish
    });
  }
}
