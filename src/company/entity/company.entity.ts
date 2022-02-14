import { Entity, CouchDbEntity } from '@blendedbot/nest-couchdb';

@Entity('company')
export class Company extends CouchDbEntity {
    name: string;
    employeeCount: number;
    turnover: number;
    webSiteUrl: string;
}
