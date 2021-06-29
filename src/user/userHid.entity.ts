import { JoinColumn, BaseEntity, Column, Entity, ManyToOne,OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';



@Entity()
export class UserHid extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hid: string;

    @Column()
    name: string;

    @Column()
    catName: string;

    // @ManyToOne(()=> User, user => user.hid)
    // user: User;

    // @OneToMany(()=>User, user=>user.name)
    // user:User;
    // @OneToOne(()=>User, user => user.userHid)
    // user: User;

    // @OneToOne(()=>User)
    // @JoinColumn()
    // user: User;

}