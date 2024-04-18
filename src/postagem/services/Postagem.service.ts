import { TemaService } from './../../tema/services/tema.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm/repository/Repository";
import { DeleteResult, ILike } from "typeorm";


@Injectable()    
export class PostagemService{
    

    constructor(
        @InjectRepository(Postagem)
      private postagemRepository: Repository<Postagem>,
      private TemaService: TemaService
    ) { }
    
    async findAll(): Promise<Postagem[]>{
      return await this.postagemRepository.find({
        relations:{
          tema: true
      }
       });
    
  }
  async findById(id: number): Promise<Postagem>{
    
    let postagem = await this.postagemRepository.findOne({
      where: {
        id 
      },
      relations:{
        tema: true
    }
    });
    //Checar se a postagem não foi encontrada
    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    
    //retornar a postagem, caso ela exista
    return postagem;

    // SELECT * FROM tb_postagens WHERE id = ?;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]>{
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`)
        
      },relations:{
        tema: true
    }
   })
  }

  async create(postagem: Postagem): Promise<Postagem>{
    if (postagem.tema) {
      let tema = await this.TemaService.findById(postagem.tema.id)

      if (!tema)
        throw new HttpException(' Tema não foi encontrado!', HttpStatus.NOT_FOUND)

      return await this.postagemRepository.save(postagem);
    }

    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {

    let buscaPostagem: Postagem = await this.findById(postagem.id);

    if (!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    if (postagem.tema) {
        
      let tema = await this.TemaService.findById(postagem.tema.id)
            
      if (!tema)
        throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            
      return await this.postagemRepository.save(postagem);

    }
    
    return await this.postagemRepository.save(postagem);
  }
  async delete(id: number): Promise<DeleteResult> { 

    let buscaPostagem = await this.findById(id)

    if (!buscaPostagem)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.delete(id);

  }
}