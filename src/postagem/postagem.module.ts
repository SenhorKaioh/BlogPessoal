import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { Module } from "@nestjs/common";
import { PostagemController } from "./controllers/postagem.controllers";
import { PostagemService } from "./services/Postagem.service";
import { TemaService } from "../tema/services/tema.service";
import { TemaModule } from "../tema/tema.module";

@Module({

    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule {

}