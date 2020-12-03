import { injectable, inject } from 'tsyringe';
import { isBefore, isAfter, differenceInDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Rental from '../infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import IRentalsRepository from '../repositories/IRentalsRepository';

@injectable()
class CreateRentalService {
  private rentalsRepository: IRentalsRepository;

  private carsRepository: ICarsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({
    car_id,
    user_id,
    start_date,
    end_date,
    daily_rent_value,
  }: ICreateRentalDTO): Promise<Rental> {
    // verificar se o carro indicado para aluguel existe
    const car = await this.carsRepository.findById(car_id);

    // se não existir erro
    if (!car) {
      throw new AppError('Selected car does not exist.');
    }

    // verificar se o usuário indicado existe
    const user = await this.usersRepository.findById(user_id);
    // se não existir erro
    if (!user) {
      throw new AppError('Invalid user.');
    }

    // verificar se o período composto pelas datas de início e fim é válido (data futura)
    if (
      isBefore(start_date, new Date()) ||
      isBefore(end_date, new Date()) ||
      isAfter(start_date, end_date)
    ) {
      throw new AppError('Selected rental period is invalid.');
    }

    // verificar se já existe um aluguel cadastrado para o carro indicado no período especificado
    // se existir erro

    // calcular o valor total do aluguel daily_rent_value * number of days
    const amountOfRentalDays = differenceInDays(end_date, start_date);
    const total = daily_rent_value * amountOfRentalDays;

    // salvar o aluguel
    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      daily_rent_value,
      total,
    });

    return rental;
  }
}

export default CreateRentalService;
