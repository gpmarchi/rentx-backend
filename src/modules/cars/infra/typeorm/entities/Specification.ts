import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import File from '@modules/files/infra/typeorm/entities/File';
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

  @Column()
  icon_id: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'icon_id' })
  icon: File;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Specification;
