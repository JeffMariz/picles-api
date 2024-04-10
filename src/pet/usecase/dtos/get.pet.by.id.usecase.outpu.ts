export default class GetPetByTdUseCaseOutput{
    id: string;
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<GetPetByTdUseCaseOutput>){
        Object.assign(this, data);
    }
}