import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import CreatePetUseCaseInput from './usecase/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecase/dtos/create.pet.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';
import GetPetByTdUseCaseOutput from './usecase/dtos/get.pet.by.id.usecase.outpu';
import GetPetByTdUseCaseInput from './usecase/dtos/get.pet.by.id.usecase.input';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseOutput from './usecase/dtos/update.pet.by.id.usecase.output';
import UpdatePetByIdUseCaseInput from './usecase/dtos/update.pet.by.id.usecase';
import DeletePetByIdUseCaseInput from './usecase/dtos/delete.pet.by.id.usecase.input copy';
import DeletePetByIdUseCaseOutput from './usecase/dtos/delete.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByTdUseCaseInput, GetPetByTdUseCaseOutput>

    @Inject(PetTokens.deletePetByIdUseCase)
    private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput){
        const useCaseInput = new CreatePetUseCaseInput ({...input})
        return await this.createPetUseCase.run(useCaseInput)
    }

    @Get(':id')
    async getPetByTd(@Param('id') id: string): Promise<GetPetByTdUseCaseOutput>{
      try{
        const useCaseInput = new GetPetByTdUseCaseInput({id})
      return await this.getPetByIdUseCase.run(useCaseInput)
      } catch (error){
        throw new BadRequestException(JSON.parse(error.message))
      }
    }
    @Put(':id')
    async updatePet(@Body()input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput>{
      try{
      const useCaseInput = new UpdatePetByIdUseCaseInput({
        ...input,
        id
      })
      return await this.updatePetByIdUseCase.run(useCaseInput)
    }catch(error){

      throw new BadRequestException(JSON.parse(error.message))
    }
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string): Promise<DeletePetByIdUseCaseOutput>{
      try{
        const useCaseInput = new DeletePetByIdUseCaseInput({id})
        return await this.deletePetByIdUseCase.run(useCaseInput)
      }catch (error){
        throw new BadRequestException(JSON.parse(error.message))
      }
    }
  }
