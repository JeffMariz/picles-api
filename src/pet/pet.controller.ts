import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
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

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByTdUseCaseInput, GetPetByTdUseCaseOutput>

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
      const useCaseInput = new UpdatePetByIdUseCaseInput({
        ...input,
        id
      })
      return await this.updatePetByIdUseCase.run(useCaseInput)
    }
  }
