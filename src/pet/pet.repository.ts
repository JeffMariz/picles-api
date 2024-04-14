import { InjectModel } from "@nestjs/mongoose/dist/common";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import GetPetsUseCaseInput from "./dtos/get.pets.usecase.input";
import FindByFilterAndTotal from "./usecases/dtos/find.by.filter.and.total";

@Injectable()
export default class PetRepository implements IPetRepository {
    [x: string]: any;

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) { }

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async updateById(data: Partial<Pet>): Promise<void> {
        await this.petModel.updateOne({
            _id: data._id
        }, {
            ...data,
            updatedAt: new Date()
        }
        )
    }

    async deleteById(id): Promise<void> {
        await this.petModel.findByIdAndDelete(id)
    }

    async findByFilter(input: GetPetsUseCaseInput): Promise<FindByFilterAndTotal> {
        const FIRST_PAGE = 1;
        const skip = FIRST_PAGE ? 0 : input.itemsPerPage * (input.page - 1);

        let query = this.petModel.find().lean();

        if(input.type){
            query = query.find({type: input.type})
        }

        if(input.size){
            query = query.find({size: input.size})
        }
        if(input.gender){
            query = query.find({gender: input.gender})
        }

        const totalQuery = query.clone().countDocuments();
        const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

        const [items, total] = await Promise.all([
            skipQuery.exec(),
            totalQuery.exec()
        ]);
        return new FindByFilterAndTotal({items, total})
    }
}