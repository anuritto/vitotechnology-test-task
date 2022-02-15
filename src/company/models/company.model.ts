import { Field, Int, ObjectType, ID,  } from '@nestjs/graphql';
import { Laptop } from 'src/laptop/models/laptop.model';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field(type => Int, { nullable: false })
  employeeCount: number;

  @Field({ nullable: false })
  turnover: number;

  @Field({ nullable: false })
  webSiteUrl: string;

  @Field(type => [Laptop], { nullable: false })
  cheapLaptops?: Laptop[];
}