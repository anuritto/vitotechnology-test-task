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

    @Query(returns => Laptop, { nullable: true })
    async laptop(@Args('id')id: string): Promise<Laptop> {
        const one = await this.laptopService.getOneById(id);
        return this.laptopService.transformOneToGraphQL(one);
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
    ): Promise<PaginatedLaptops> {
        const laptops = await this.laptopService.getList(page, limit);
        
        return {
            ...laptops,
            list: this.laptopService.transformListToGraphQL(laptops.list)
        }
    }
}
