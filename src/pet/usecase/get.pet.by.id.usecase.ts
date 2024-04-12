import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByTdUseCaseInput from "./dtos/get.pet.by.id.usecase.input";
import GetPetByTdUseCaseOutput from "./dtos/get.pet.by.id.usecase.outpu";
import { Inject, Injectable } from "@nestjs/common";
import IPetRepository from "../interfaces/pet.repository.interface";
import { errorMonitor } from "events";
import { Pet } from "../schemas/pet.schema";
import PetTokens from "../pet.tokens";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.service.interface";

@Injectable()
export default class GetPetByTdUseCase implements IUseCase<GetPetByTdUseCaseInput, GetPetByTdUseCaseOutput>{
    
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,
        
        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ){}
    
    async run(input: GetPetByTdUseCaseInput): Promise<GetPetByTdUseCaseOutput> {
        const pet = await this.getPetById(input.id)

        if (pet === null){
            throw new PetNotFoundError()
        }

        const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString ('base64'): null;
        
        return new GetPetByTdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: petPhoto,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt,
        });
    }
        private async getPetById(id: string): Promise<Pet>
        {
            try{
                return await this.petRepository.getById(id)
            }catch (error){
                return null
            }
        }
    }
    