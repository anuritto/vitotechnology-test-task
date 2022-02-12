import { Controller, Get } from '@nestjs/common';

@Controller('company')
export class CompanyController {
    @Get()
    welcome() {
        return 'welcome to company controller';
    }
}
