import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import CreatePetUseCase from './usecase/create.pet.usecase';
import PetTokens from './pet.tokens';
import PetRepository from './pet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import GetPetByTdUseCase from './usecase/get.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecase/update.pet.by.id.usecase';
import DeletePetByIdUseCase from './usecase/delete.pet.by.id.usecase';
import UpdatePetPhotoByIdUseCase from './usecase/update.pet.photo.by.id.usecase';
import FileService from 'src/file.service';
import AppTokens from 'src/app.tokens';

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
    },
    {
      provide: PetTokens.deletePetByIdUseCase,
      useClass: DeletePetByIdUseCase
    },
    {
      provide: PetTokens.updatePetPhotoByIdUseCase,
      useClass: UpdatePetPhotoByIdUseCase
    },
    {
      provide: AppTokens.fileService,
      useClass: FileService
    }
  ]
})
export class PetModule {}
