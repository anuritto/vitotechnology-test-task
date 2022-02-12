import { Module } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { LaptopResolver } from './laptop.resolver';
import { LaptopService } from './laptop.service';

@Module({
  providers: [LaptopResolver, LaptopService, CompanyService]
})
export class LaptopModule {}
