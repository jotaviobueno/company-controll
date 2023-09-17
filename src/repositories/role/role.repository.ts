import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './irole.repository';

@Injectable()
export class RoleRepository extends IRoleRepository {}
