import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import CarSpecification from './CarSpecification';

@Entity('specifications')
class Specification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @OneToMany(
    () => CarSpecification,
    carSpecification => carSpecification.specification,
    {
      cascade: true,
    },
  )
  cars: CarSpecification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Specification;
