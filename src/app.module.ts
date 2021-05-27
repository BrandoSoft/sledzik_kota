import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordsController } from './coords/coords.controller';
import { CoordsService } from './coords/coords.service';
import { UserModule } from './user/user.module';
import { CoordsModule } from './coords/coords.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CoordsModule],
  controllers: [AppController, CoordsController],
  providers: [AppService, CoordsService],
})
export class AppModule {}
