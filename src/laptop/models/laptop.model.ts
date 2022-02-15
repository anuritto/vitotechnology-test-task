import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { Company } from 'src/company/models/company.model';

@ObjectType()
export class Laptop {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  model: string;

  @Field({ nullable: true })
  diagonal: number;

  @Field(type => Int, { nullable: true })
  price: number;

  @Field(type => Int, { nullable: true })
  ram: number;

  @Field(type => Int, { nullable: true })
  coreCount: number;

  @Field({ nullable: true })
  frequency: number;

  @Field({ nullable: true })
  gpu?: string;

  @Field({ nullable: true })
  companyId: string;

  @Field(type => Company, { nullable: true})
  company?: Company;
}