import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';

@Entity()
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    precioTotal: string;

    @Column()
    idLibro: number;
   
    @ManyToOne(() => Libro, libro => libro.ventas)
    libro: Libro;
}