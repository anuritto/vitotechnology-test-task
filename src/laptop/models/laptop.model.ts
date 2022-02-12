import { Field, Int, ObjectType, ID,  } from '@nestjs/graphql';
import { Company } from 'src/company/models/company.model';

@ObjectType()
export class Laptop {
  @Field(type => ID)
  id: number;

  @Field({ nullable: false })
  model: string;

  @Field(type => Int, { nullable: false })
  diagonal: number;

  @Field(type => Int, { nullable: false })
  price: number;

  @Field(type => Int, { nullable: false })
  ram: number;

  @Field(type => Int, { nullable: false })
  coreCount: number;

  @Field(type => Int, { nullable: false })
  frequency: number;

  @Field({ nullable: true })
  gpu?: string;

  @Field(type => ID)
  companyId: number;

  @Field(type => Company, { nullable: false})
  company?: Company;
}