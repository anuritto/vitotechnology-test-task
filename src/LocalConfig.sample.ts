import { CouchDbConnectionConfig } from "@blendedbot/nest-couchdb";

export const port = 3000;

export const couchDBConnection: CouchDbConnectionConfig = {
    url: 'http://127.0.0.1:5984',
    username: 'admin',
    userpass: 'admin',
    requestDefaults: { jar: true },
}