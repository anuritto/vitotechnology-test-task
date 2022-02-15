import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Common/Pagination';
import { Laptop } from './entity/laptop.entity';
import { Laptop as LaptopModel} from './models/laptop.model';
import { SortOrder} from 'nano';

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
            const { _id, name, coreCount, frequency, ram, price, companyId, gpu, diagonal} = entity;
            return <LaptopModel>{ id: _id, model: name, coreCount, frequency, ram, price, companyId, gpu, diagonal}
        }
        
    }

    transformListToGraphQL(entities: Laptop[]): LaptopModel[] {
        return entities.map(this.transformOneToGraphQL);
    }
}
