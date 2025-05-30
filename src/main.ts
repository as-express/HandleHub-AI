import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { statisticConfig } from 'config/statistic'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
statisticConfig()
