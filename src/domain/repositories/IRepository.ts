// IRepository.ts
export interface IRepository<T> {
    findById(id: string): Promise<T | null>;
    save(entity: T): Promise<void>;
    remove(id: string): Promise<void>;
}
