import { Type } from "@nestjs/common";
import { Field, ObjectType, Int } from "@nestjs/graphql";

export interface Pagination<T> {
    list: T[];
    totalCount: number;
    page: number;
    limit: number;
}

export function Paginated<T>(entity: Type<T>): Type<Pagination<T>> {

    @ObjectType({ isAbstract: true })
    abstract class PaginatedEntity implements Pagination<T> {
        @Field(type => [entity], { nullable: false })
        list: T[];

        @Field(type => Int, { nullable: false })
        totalCount: number;

        @Field(type => Int, { nullable: false })
        page: number;

        @Field(type => Int, { nullable: false })
        limit: number;
    };

    return PaginatedEntity as Type<Pagination<T>>;
}
