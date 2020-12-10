import { Repository, getRepository, ILike, In, Not } from 'typeorm';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import IPaginatedCarResponseDTO from '@modules/cars/dtos/IPaginatedCarResponseDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
    fuel_id,
    transmission_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
      fuel_id,
      transmission_id,
    });

    await this.ormRepository.save(car);

    return car;
  }

  public async findByName(name: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({ where: { name } });

    return car;
  }

  public async findAll({
    page,
    limit,
    name,
  }: IFindAllCarsDTO): Promise<IPaginatedCarResponseDTO> {
    let where = {};

    if (name) {
      where = {
        where: { name: ILike(`%${name}%`) },
      };
    }

    const totalRecords = await this.ormRepository.count({ ...where });
    const totalPages = Math.ceil(totalRecords / limit);

    const cars = await this.ormRepository.find({
      select: ['id', 'name', 'brand', 'model', 'daily_rent_value'],
      ...where,
      relations: ['fuel', 'fuel.icon', 'images'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { totalRecords, totalPages, data: cars };
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne(id, {
      select: ['id', 'name', 'brand', 'model', 'daily_rent_value'],
      relations: [
        'specifications',
        'specifications.specification',
        'specifications.specification.icon',
        'fuel',
        'fuel.icon',
        'transmission',
        'transmission.icon',
        'images',
      ],
    });

    return car;
  }

  public async findNotListed(ids: string[]): Promise<Car[]> {
    const cars = this.ormRepository.find({
      where: { id: Not(In(ids)) },
      relations: ['fuel', 'fuel.icon', 'images'],
    });

    return cars;
  }
}

export default CarsRepository;
