import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import CreatePetUseCaseInput from './usecase/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecase/dtos/create.pet.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput){
        const useCaseInput = new CreatePetUseCaseInput ({...input})
        return await this.createPetUseCase.run(useCaseInput)
    }
}
