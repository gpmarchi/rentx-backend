import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import Specification from '@modules/cars/infra/typeorm/entities/Specification';

@Entity('cars_specifications')
class CarSpecification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, car => car.specifications)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  specification_id: string;

  @ManyToOne(() => Specification, specification => specification.cars)
  @JoinColumn({ name: 'specification_id' })
  specification: Specification;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CarSpecification;
