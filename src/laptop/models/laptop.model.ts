import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { Company } from 'src/company/models/company.model';

@ObjectType()
export class Laptop {
//   @Field(type => ID)
//   id: number;

  @Field({ nullable: true })
  model: string;

  @Field(type => Int, { nullable: true })
  diagonal: number;

  @Field(type => Int, { nullable: true })
  price: number;

  @Field(type => Int, { nullable: true })
  ram: number;

  @Field(type => Int, { nullable: true })
  coreCount: number;

  @Field(type => Int, { nullable: true })
  frequency: number;

  @Field({ nullable: true })
  gpu?: string;

  @Field(type => ID, { nullable: true })
  companyId: number;

  @Field(type => Company, { nullable: true})
  company?: Company;
}