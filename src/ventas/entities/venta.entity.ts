import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';
import { Client } from 'src/clientes/entities/cliente.entity';

@Entity()
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    precioTotal: string;

    @ManyToOne(() => Client, client => client.ventas)
    @JoinColumn()
    client: Client

    @ManyToOne(() => Libro, libro => libro.ventas)
    @JoinColumn({name: 'libroId'})
    libro: Libro;
}