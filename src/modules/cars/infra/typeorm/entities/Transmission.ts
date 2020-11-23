import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import File from '@modules/files/infra/typeorm/entities/File';

@Entity('transmissions')
class Transmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

export default Transmission;
