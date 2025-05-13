export interface ICrudOperations<T, CreateDTO, UpdateDTO> {
  findAll(): Promise<T[]>;  
  findOne(id: string): Promise<T>; 
  create(dto: CreateDTO): Promise<T>; 
  update(id: string, dto: UpdateDTO): Promise<T>; 
  delete(id: string): Promise<boolean | void>; 
}