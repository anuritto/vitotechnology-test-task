import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyResolver } from './company.resolver';
import { LaptopService } from 'src/laptop/laptop.service';
import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Laptop } from 'src/laptop/entity/laptop.entity';
import { Company } from './entity/company.entity';

@Module({
  providers: [CompanyService, CompanyResolver, LaptopService],
  controllers: [CompanyController],
  imports: [CouchDbModule.forFeature([Laptop, Company])]
})
export class CompanyModule {}
