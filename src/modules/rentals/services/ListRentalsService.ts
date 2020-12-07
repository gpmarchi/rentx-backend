import { injectable, inject } from 'tsyringe';

import Rental from '../infra/typeorm/entities/Rental';

import IRentalsRepository from '../repositories/IRentalsRepository';

@injectable()
class ListRentalsService {
  private rentalsRepository: IRentalsRepository;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
  }

  public async execute(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.findByUserId(user_id);
  }
}

export default ListRentalsService;
