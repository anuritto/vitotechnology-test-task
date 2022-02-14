import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Module } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entity/company.entity';
import { Laptop } from './entity/laptop.entity';
import { LaptopResolver } from './laptop.resolver';
import { LaptopService } from './laptop.service';

@Module({
  providers: [LaptopResolver, LaptopService, CompanyService],
  imports: [CouchDbModule.forFeature([Laptop, Company])]
})
export class LaptopModule {}
