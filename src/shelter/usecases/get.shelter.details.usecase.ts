import { IUseCase } from 'src/domain/iusecase.interface';
import GetShelterDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';

export default class GetShelterDetailsUseCase
  implements IUseCase<null, GetShelterDetailsUseCaseOutput>
{
  run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
    return Promise.resolve(new GetShelterDetailsUseCaseOutput({
      shelterName: 'Casa de adoção do Caramelo',
      shelterEmail: 'newpet@email.com',
      shelterPhone: '3445-36640',
      shelterWhatsApp: '19992250066',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }
}