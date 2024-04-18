import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { Module } from "@nestjs/common";
import { PostagemService } from "./services/Postagem.service";
import { PostagemController } from "./controllers/postagem.controllers";
import { TemaModule } from "src/tema/tema.module";
import { TemaService } from "src/tema/services/tema.service";

@Module({

    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports:[TypeOrmModule]
})
export class PostagemModule{

}