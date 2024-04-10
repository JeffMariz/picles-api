export default class GetPetByTdUseCaseInput{
    id: string

    constructor(data: Partial<GetPetByTdUseCaseInput>){
        Object.assign(this, data);
    }
}