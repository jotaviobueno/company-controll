import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CategoryFindOneUseCase } from '../find-one';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';

@Injectable()
export class CategorySoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly categoryFindOneUseCase: CategoryFindOneUseCase,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const category = await this.categoryFindOneUseCase.execute(data);

    const remove = await this.categoryRepository.softDelete(category.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
