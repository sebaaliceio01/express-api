import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class New {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    subtitle:string

    @Column('text')
    text: string

    @Column()
    image: string

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updateAt: Date


}