//typeorm variables
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//Tweet Entity
import Tweet from './Tweet'

@Entity()
export default class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  uuid: string; 

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name!: string;

  @Column({ unique: true, select: false })
  email!: string;

  @Column({ unique: true})
  username!: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Tweet, (tweet:Tweet) => tweet.creator)
  tweets: Tweet[]

}