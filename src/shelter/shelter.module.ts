import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';

@Module({
  controllers: [ShelterController],
  
  impoprts: [
    MongooseModule.forFeature([{name: Shelter.name, schema: ShelterSchema}])
  ]

  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase,
    },
  ],
})
export class ShelterModule {}
