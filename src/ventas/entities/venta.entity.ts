// venta.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';

@Entity()
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    precioTotal: number;

    @ManyToOne(() => Libro, libro => libro.ventas)
    libro: Libro;
}