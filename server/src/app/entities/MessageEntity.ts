import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { UserEntity } from './UserEntity';

@Entity('messages')
class MessageEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  admin_id: string;

  @Column('uuid')
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column('varchar')
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { MessageEntity };
