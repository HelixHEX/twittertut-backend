//typeorm variables
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

//User Entity

@Entity()
export default class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date
  
  @Column()
  tweet!: string;

  @ManyToOne(() => User, (user: User) => user.tweets)
  @JoinColumn({name: 'userUUID'})
  creator: Tweet

  @Column()
  userUUID: string;
}