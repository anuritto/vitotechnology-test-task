import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Common/Pagination';
import { Laptop } from './entity/laptop.entity';
import { Laptop as LaptopModel} from './models/laptop.model';
import { SortOrder} from 'nano';

/** заглушка */
const hardcode = {
    id: 1,
    diagonal: 10,
    price: 100,
    model: 'dfdsf',
    coreCount: 5,
    ram: 4084,
    frequency: 2400,
    companyId: 1,
};

@Injectable()
export class LaptopService {
    constructor(
        @InjectRepository(Laptop)
        private readonly laptopRepository: Repository<Laptop>,
    ) {}

    async getOneById(id: string) {
        return (await this.getListByParam({ selector: {_id: id } })).docs[0];

    }

    async getList(page: number = 0, limit = 10) {
        const response = await (await this.laptopRepository.list({
            limit,
            include_docs: true,
            skip: page * limit,
        }));
        const list = response.rows.map(row => row.doc)
        const totalCount = response.total_rows;
        
        const res: Pagination<Laptop> = { page, totalCount, limit, list }

        return res;
    }

    async getListByParam(data: { selector: Partial<Laptop>, sort?: SortOrder[] }, limit = 10) {
        return this.laptopRepository.find({
            ...data,
            limit,
        })
    }

    async getTopСheapOfCompany(companyId: string) {
        return (await this.getListByParam({
            selector: { companyId },
            sort: [{ price: 'asc' }],
        })).docs;
    }

    // for the future
    transformOneToGraphQL(entity: Laptop): LaptopModel {
        if(entity) {
            return <LaptopModel>{
                model: entity.name,
                coreCount: entity.coreCount,
                frequency: entity.frequency,
                ram: entity.ram,
                price: entity.price,
                companyId: entity.companyId,
                gpu: entity.gpu,
                diagonal: entity.diagonal,
            }
        }
        
    }

    transformListToGraphQL(entities: Laptop[]): LaptopModel[] {
        return entities.map(this.transformOneToGraphQL);
    }
}
