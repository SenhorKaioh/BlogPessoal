import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { IsNotEmpty } from 'class-validator';
import { Postagem } from 'src/postagem/entities/postagem.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_temas" })
export class Tema{
    
    @PrimaryGeneratedColumn()
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string

    @OneToMany(()=> Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]

   }