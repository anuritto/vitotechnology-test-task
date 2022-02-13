import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Module } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Laptop } from './entity/laptop.entity';
import { LaptopResolver } from './laptop.resolver';
import { LaptopService } from './laptop.service';

@Module({
  providers: [LaptopResolver, LaptopService, CompanyService],
  imports: [CouchDbModule.forFeature([Laptop])]
})
export class LaptopModule {}
