import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('settings')
class SettingEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  username: string;

  @Column('boolean')
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { SettingEntity };
