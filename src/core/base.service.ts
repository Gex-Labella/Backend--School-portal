import { Repository, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { ICrudOperations } from './interfaces/crud.interface';
import { NotFoundError } from './errors/custom-errors';
import { IBaseEntity } from './types/base.types';

export abstract class BaseService<T extends IBaseEntity, CreateDTO, UpdateDTO>
    implements ICrudOperations<T, CreateDTO, UpdateDTO> {
    
    constructor(
        protected readonly repository: Repository<T>,
        protected readonly entityName: string
    ) {}

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<T> {
        const options: FindOneOptions<T> = {
            where: {
                id: id as any
            } as FindOptionsWhere<T>
        };
        
        const entity = await this.repository.findOne(options);
        if (!entity) {
            throw new NotFoundError(this.entityName, id);
        }
        return entity;
    }

    async create(dto: CreateDTO): Promise<T> {
        const entity = this.repository.create(dto as any);
        return await this.repository.save(entity);
    }

    async update(id: string, dto: UpdateDTO): Promise<T> {
        const existing = await this.findOne(id);
        const merged = this.repository.merge(existing, dto as any);
        return await this.repository.save(merged);
    }

    async delete(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
