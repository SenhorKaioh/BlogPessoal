import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { Module } from "@nestjs/common";
import { PostagemService } from "./services/Postagem.service";
import { PostagemController } from "./controllers/postagem.controllers";

@Module({

    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports:[TypeOrmModule]
})
export class PostagemModule{

}