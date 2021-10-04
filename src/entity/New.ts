import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class New {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    subtitle:string

    @Column()
    image: string


}