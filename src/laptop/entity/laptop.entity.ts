import { Entity, CouchDbEntity } from '@blendedbot/nest-couchdb';

@Entity('laptop')
export class Laptop extends CouchDbEntity {
  name: string;
  price: number;
  companyId: number;
  diagonal: number;
  ram: number;
  coreCount: number;
  frequency: number;
  gpu?: string;
}