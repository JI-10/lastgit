import {Module} from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.providers';

@Module({
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule{}