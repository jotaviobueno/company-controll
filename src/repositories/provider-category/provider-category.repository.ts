import { Injectable } from '@nestjs/common';
import { IProviderCategoryRepository } from './iprovider-category.repository';

@Injectable()
export class ProviderCategoryRepository extends IProviderCategoryRepository {}
