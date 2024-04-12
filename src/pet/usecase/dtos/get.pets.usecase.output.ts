export default class GetPetsUseCaseOutput{
    type?: string;
    size?: string;
    gender?: string;
    page: number;
    itensPerPage: number;

    constructor(data: Partial<GetPetsUseCaseOutput>)
{
    Object.assign(this, data)
}
}