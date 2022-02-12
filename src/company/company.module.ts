import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyResolver } from './company.resolver';
import { LaptopService } from 'src/laptop/laptop.service';

@Module({
  providers: [CompanyService, CompanyResolver, LaptopService],
  controllers: [CompanyController]
})
export class CompanyModule {}
