import { injectModel} from "@nestjs/mongoose";
import { Shelter} from "./shemas/shelter.schemas"
import { Model } from ""

export clas ShelterRepository implements IShelterRepository {
    constructor(
        @injectModel(shelter.name)
        private readonly shelterModel: Model<Shelter>
    ){}

    async get(): Promise<Shelter>{
        return await this.shelterModel.findOne()
    }

}