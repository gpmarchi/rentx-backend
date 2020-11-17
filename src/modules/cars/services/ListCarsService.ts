import { injectable, inject } from 'tsyringe';

import IFindAllCarsDTO from '../dtos/IFindAllCarsDTO';
import IPaginatedCarResponseDTO from '../dtos/IPaginatedCarResponseDTO';

import ICarsRepository from '../repositories/ICarsRepository';

@injectable()
class ListCarsService {
  private carsRepository: ICarsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.carsRepository = carsRepository;
  }

  public async execute({
    page,
    limit,
    name,
  }: IFindAllCarsDTO): Promise<IPaginatedCarResponseDTO> {
    return this.carsRepository.findAll({ page, limit, name });
  }
}

export default ListCarsService;
