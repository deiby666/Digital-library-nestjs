import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Autore } from "src/autores/entities/autore.entity";
import { Venta } from "src/ventas/entities/venta.entity";


@Entity()
export class Libro{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @ManyToOne(() => Autore, autor => autor.Libros)
    @JoinColumn({name: 'authorId'})
    autor: Autore

    @OneToMany(() => Venta, venta => venta.libro)
    @JoinColumn()
    ventas: Venta[]

    @DeleteDateColumn()
    deletedAt: Date;
}
