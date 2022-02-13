import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { LaptopController } from './laptop/laptop.controller';
import { LaptopModule } from './laptop/laptop.module';
import { CompanyModule } from './company/company.module';
import { CompanyController } from './company/company.controller';
import { CouchDbModule } from '@blendedbot/nest-couchdb';

@Module({
  imports: [
      GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
          include: [LaptopModule, CompanyModule]
      }),
      LaptopModule,
      CompanyModule,
      CouchDbModule.forRoot({
        url: 'http://127.0.0.1:5984',
        username: 'admin',
        userpass: 'admin',
        requestDefaults: { jar: true },
      }),
    ],
  controllers: [AppController, LaptopController, CompanyController],
  providers: [AppService],
})
export class AppModule {}
