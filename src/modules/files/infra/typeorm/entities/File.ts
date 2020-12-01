import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import Car from '@modules/cars/infra/typeorm/entities/Car';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  original_name: string;

  @Column()
  filename: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, car => car.images)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'file_url' })
  getFileUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.filename}`;
      default:
        return null;
    }
  }
}

export default File;
