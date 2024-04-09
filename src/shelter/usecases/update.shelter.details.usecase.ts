import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateSheltherDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.imput";
import UpdateSheltherDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>
{
    constructor (

        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
    ){}

    async run(input: UpdateSheltherDetailsUseCaseInput): Promise<UpdateSheltherDetailsUseCaseOutput>{
       
        await this.shelterRepository.update(input);

        const shelter = await this.shelterRepository.get()

        return new UpdateSheltherDetailsUseCaseOutput({
            name: shelter.name,
            phone: shelter.phone,
            whatsapp: shelter.whatsApp,
            email: shelter.email,
            updatedAt: shelter.updatedAt,
            createdAt: shelter.createdAt
        })
    }
}