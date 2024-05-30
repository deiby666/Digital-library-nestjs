import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from "src/libros/entities/libro.entity";


@Entity()
export class Autore{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;

    @OneToMany(() => Libro, Libro => Libro.autor)
    Libros: Libro[]
}
