import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Venta } from "src/ventas/entities/venta.entity";


@Entity()
export class Client{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Venta, venta => venta.libro)
    @JoinColumn()
    ventas: Venta[]
}
