import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TopOperators {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    getCall: string

    @Column()
    callsMade: string

    @Column() 
    callsLost: string

    @Column()
    timePhone: string
}