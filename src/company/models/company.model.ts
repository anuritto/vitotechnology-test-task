import { Field, Int, ObjectType, ID,  } from '@nestjs/graphql';
import { Laptop } from 'src/laptop/models/laptop.model';

@ObjectType()
export class Company {
  @Field(type => ID)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field(type => Int, { nullable: false })
  employeeCount: number;

  @Field(type => Int, { nullable: false })
  turnover: number;

  @Field({ nullable: false })
  webSiteUrl: string;

  @Field(type => [Laptop], { nullable: false })
  laptops?: Laptop[];
}