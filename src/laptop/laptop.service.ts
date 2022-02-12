import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Common/Pagination';
import { Laptop } from './models/laptop.model';

/** заглушка */
const hardcode: Laptop = {
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
    async getOneById(id: number) {
        return hardcode;
    }

    async getList(page: number = 0, limit = 10) {
        const res: Pagination<Laptop> = { page, totalCount: 100, limit, list: [hardcode,hardcode,hardcode] }
        return res;
    }

    async getTop(companyId: number) {
        return (await this.getList(0)).list;
    }
}
