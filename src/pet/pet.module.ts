import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import CreatePetUseCase from './usecase/create.pet.usecase';
import PetTokens from './pet.tokens';
import PetRepository from './pet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import GetPetByTdUseCase from './usecase/get.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecase/update.pet.by.id.usecase';

@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}])],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository
    },
    {
      provide: PetTokens.updatePetByIdUseCase,
      useClass: UpdatePetByIdUseCase 
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByTdUseCase
    }
  ]
})
export class PetModule {}
