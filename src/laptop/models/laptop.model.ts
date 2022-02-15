import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { Company } from 'src/company/models/company.model';

@ObjectType()
export class Laptop {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  model: string;

  @Field({ nullable: false })
  diagonal: number;

  @Field(type => Int, { nullable: false })
  price: number;

  @Field(type => Int, { nullable: false })
  ram: number;

  @Field(type => Int, { nullable: false })
  coreCount: number;

  @Field({ nullable: false })
  frequency: number;

  @Field({ nullable: true })
  gpu?: string;

  @Field({ nullable: false })
  companyId: string;

  @Field(type => Company, { nullable: true})
  company?: Company;
}