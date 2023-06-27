import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserEntity };
