import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { MarksModule } from './marks/marks.module';
import { AcademicsModule } from './academics/academics.module';
import { FeesModule } from './fees/fees.module';
import { HostelModule } from './hostel/hostel.module';
import { CanteenModule } from './canteen/canteen.module';
import { CmsModule } from './cms/cms.module';
import { AdminModule } from './admin/admin.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StudentsModule,
    MarksModule,
    AcademicsModule,
    FeesModule,
    HostelModule,
    CanteenModule,
    CmsModule,
    AdminModule,
    ChatbotModule,
  ],
})
export class AppModule {}
