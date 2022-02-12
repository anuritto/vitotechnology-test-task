import { UsePipes } from '@nestjs/common';
import { Args, ID, Int, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Paginated } from 'src/Common/Pagination';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/models/company.model';
import { LaptopService } from './laptop.service';
import { Laptop } from './models/laptop.model';
import NestjsGraphqlValidator from 'nestjs-graphql-validator'

@ObjectType()
class PaginatedLaptops extends Paginated(Laptop) {};

@Resolver(of => Laptop)
export class LaptopResolver {
    constructor(
        private readonly laptopService: LaptopService,
        private readonly companyService: CompanyService,
    ) {}

    @Query(returns => Laptop)
    async laptop(@Args('id', { type: () => Int })id: number) {
        return this.laptopService.getOneById(id);
    }

    @ResolveField('company', returns => Company)
    async getCompanyOfLaptop(@Parent()laptop: Laptop) {
        return this.companyService.getOneById(laptop.companyId);
    }

    @Query(returns => PaginatedLaptops)
    @UsePipes(new NestjsGraphqlValidator({
        limit: { max: 30, min: 10 },
        page: { min: 0 }
    }))
    async laptops(
        @Args('page', { type: () => Int })page: number,
        @Args('limit', { type: () => Int, defaultValue: 10 })limit: number
    ) {
        return (await this.laptopService.getList(page, limit));
    }
}
