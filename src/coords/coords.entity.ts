import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Coords extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()   
    hid: string;

    @Column()   
    latitude: string;

    @Column()   
    longitude: string;

    @Column()
    date: string;
}