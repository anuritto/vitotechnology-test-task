import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Common/Pagination';
import { Company } from './entity/company.entity';
import { Company as CompanyModel } from './models/company.model';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async getOneById(id: string) {
        return (await this.companyRepository.find({ selector: {"_id": id } })).docs[0];
    }

    async getList(page: number = 0, limit = 10) {
        const response = await (await this.companyRepository.list({
            limit,
            include_docs: true,
            skip: page * limit,
        }));
        const list = response.rows.map(row => row.doc)
        const totalCount = response.total_rows;
        const pagination: Pagination<Company> = { page, totalCount, limit, list }
        return pagination;
    }

    // for the future
    transformOneToGraphQL(entity: Company): CompanyModel {
        if(entity) {
            const { name, webSiteUrl, turnover, employeeCount } = entity;
            return <CompanyModel>{ name, webSiteUrl, turnover, employeeCount };
        } 
    }

    transformListToGraphQL(entities: Company[]): CompanyModel[] {
        return entities.map(this.transformOneToGraphQL);
    }
}
