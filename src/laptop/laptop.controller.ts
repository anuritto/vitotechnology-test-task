import { Controller, Get } from '@nestjs/common';

@Controller('laptop')
export class LaptopController {
    @Get()
    public welcome() {
        return 'welcome to laptop module'
    }
}
