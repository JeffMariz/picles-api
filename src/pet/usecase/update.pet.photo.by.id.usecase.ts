import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoByIdUseCaseInput from "./dtos/update.pet.photo.by.id.usecase.input copy";
import UpdatePetPhotoByIdUseCaseOutput from "./dtos/update.pet.photo.by.id.usecase.Output";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetTokens from "../pet.tokens";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { isModuleNamespaceObject } from "util/types";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.service.interface";

@Injectable()
export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>{
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ){}

    async run(input: UpdatePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput> {
        const pet = await this.getPetById(input.id)
        if(!Pet){
            throw new PetNotFoundError()
        }
        await this.petRepository.updateById({
            _id: input.id,
            photo: input.photoPath,
        });

        const photo = await this.fileService.readFile(input.photoPath);

       return new UpdatePetPhotoByIdUseCaseOutput({
        id: pet._id,
        name: pet.name,
        type: pet.type,
        size: pet.size,
        gender: pet.gender,
        bio: pet.bio,
        photo: photo.toString('base64'),
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