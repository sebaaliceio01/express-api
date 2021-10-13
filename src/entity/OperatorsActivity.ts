import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OperatorsActivity {
    @PrimaryGeneratedColumn()
    id: number
   
    @Column()
    time:string

    @Column()
    activity: string

    @Column()
    day: string

    @Column()
    phoneId: string

    @Column()
    operator: string

    @Column()
    line: string

    @Column()
    timeWait: string

    @Column()
    timeDuration: string

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updateAt: Date

}