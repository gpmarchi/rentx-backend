import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import CarSpecification from './CarSpecification';
import Fuel from './Fuel';
import Transmission from './Transmission';

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

  @Column()
  fuel_id: string;

  @ManyToOne(() => Fuel)
  @JoinColumn({ name: 'fuel_id' })
  fuel: Fuel;

  @Column()
  transmission_id: string;

  @ManyToOne(() => Transmission)
  @JoinColumn({ name: 'transmission_id' })
  transmission: Transmission;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Car;
