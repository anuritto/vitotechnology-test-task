import { UsePipes } from '@nestjs/common';
import { Args, ID, Int, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import NestjsGraphqlValidator from 'nestjs-graphql-validator';
import { Paginated } from 'src/Common/Pagination';
import { LaptopService } from 'src/laptop/laptop.service';
import { Laptop } from 'src/laptop/models/laptop.model';
import { CompanyService } from './company.service';
import { Company } from './models/company.model';

@ObjectType()
class PaginatedCompanies extends Paginated(Company) {}

@Resolver(of => Company)
export class CompanyResolver {
    constructor(
        private readonly companyService: CompanyService,
        private readonly laptopService: LaptopService,
    ) {}

    @Query(returns => Company, { nullable: true })
    async company(@Args('id')id: string) {
        return this.companyService.transformOneToGraphQL(await this.companyService.getOneById(id));
    }

    @Query(returns => PaginatedCompanies)
    @UsePipes(new NestjsGraphqlValidator({
        page: { min: 0 },
        limit: { max: 30, min: 10 },
    }))
    async companies(
        @Args('page', { type: () => Int })page: number,
        @Args('limit', { type: () => Int, defaultValue: 10 })limit: number
    ): Promise<PaginatedCompanies>  {
        const companiesChunk = await this.companyService.getList(page, limit);
        return {
            ...companiesChunk,
            list: this.companyService.transformListToGraphQL(companiesChunk.list)
        }

    }

    @ResolveField('cheapLaptops', returns => [Laptop])
    async laptops(@Parent()company: Company) {
        const laptops = await this.laptopService.getTopСheapOfCompany(company.id);
        return this.laptopService.transformListToGraphQL(laptops);
    }
}
