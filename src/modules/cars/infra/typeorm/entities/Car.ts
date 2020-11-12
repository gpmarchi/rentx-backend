import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import CarSpecification from './CarSpecification';

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  daily_rent_value: number;

  @OneToMany(() => CarSpecification, carSpecification => carSpecification.car, {
    cascade: true,
  })
  specifications: CarSpecification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Car;
