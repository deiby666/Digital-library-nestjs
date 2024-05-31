import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Autore } from "src/autores/entities/autore.entity";
import { Venta } from "src/ventas/entities/venta.entity";


@Entity()
export class Libro{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column()
    autorId: number;

    @ManyToOne(() => Autore, autor => autor.Libros)
    autor: Autore

    @OneToMany(() => Venta, venta => venta.libro)
    ventas: Venta[]
}
