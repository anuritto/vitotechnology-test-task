import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Common/Pagination';
import { Company } from './models/company.model';

const hardcode =  {
    id: 2,
    name: 'asus',
    employeeCount: 1234567,
    turnover: 1360000000,
    webSiteUrl: 'asus.com'
}

@Injectable()
export class CompanyService {
    async getOneById(id: number): Promise<Company> {
        return hardcode;
    }

    async getList(page: number = 0, limit: number = 10): Promise<Pagination<Company>> {
        return <Pagination<Company>> {
            limit,
            page,
            list: [hardcode, hardcode, hardcode]
        }
    }
}
