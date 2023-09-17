import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';

@Injectable()
export class CategoryFindOrCreateUseCase
  implements IBaseUseCase<string[], string[]>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(data: string[]): Promise<string[]> {
    const categories = await Promise.all(
      data.map(async (name) => {
        const nameAlreadyExists =
          await this.categoryRepository.findByName(name);

        if (nameAlreadyExists) return nameAlreadyExists;

        return this.categoryRepository.create({ name });
      }),
    );

    return categories.map((category) => category.id);
  }
}
