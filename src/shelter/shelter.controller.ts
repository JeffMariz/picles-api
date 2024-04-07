import { Body, Controller, Get, Inject, Patch, Post, Put } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterControllerInput from './dtos/update.shelter.controller.input';
import UpdateSheltherDetailsUseCaseOutput from './usecases/dtos/update.shelter.details.usecase.output';
import UpdateSheltherDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.imput';

@Controller('shelter')
export class ShelterController {
  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly getShelterDetailsUseCase: IUseCase<
    null,
    GetShelterDetailsUseCaseOutput
  >;

  @Inject(ShelterTokens.updateShelterDetailsUseCase)
  private readonly updateShelterDetailsUseCase: IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>;

  @Get()
  async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput> {
    return await this.getShelterDetailsUseCase.run(null);
  }

  @Put()
  async updateShelterDetails(@Body() input: UpdateShelterControllerInput) {
    const useCaseInput = new UpdateSheltherDetailsUseCaseInput({...input});
    return await this.updateShelterDetailsUseCase.run(useCaseInput);
  }
}