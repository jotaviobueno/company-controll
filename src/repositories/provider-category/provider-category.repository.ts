import { Injectable } from '@nestjs/common';
import { IProviderCategoryRepository } from './iprovider-category.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateProviderCategoryDto } from 'src/domain/dtos/provider-category';

@Injectable()
export class ProviderCategoryRepository
  implements Partial<IProviderCategoryRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateProviderCategoryDto[]): Promise<any> {
    return this.prismaService.providerCategory.createMany({
      data: createDto,
    });
  }
}
