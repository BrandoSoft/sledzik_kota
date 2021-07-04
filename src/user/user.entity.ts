import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @Column()
    hid: string;

    @Column()
    isAdmin: boolean;
    //
    // @OneToMany(()=> UserHid, userHid => userHid.hid)
    //     userHid: UserHid[];

    // @ManyToOne(()=> UserHid, userHid => userHid.hid)
    // userHid: UserHid;
    //
    // @ManyToOne(()=> UserHid, userHid =>userHid.hid)
    // userHid: string;


}