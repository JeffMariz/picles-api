import { Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateSheltherDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.imput copy";
import UpdateSheltherDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>
{
    run(input: UpdateSheltherDetailsUseCaseInput): Promise<UpdateSheltherDetailsUseCaseOutput>{
        throw new Error("Method not implemented.");
    }
}