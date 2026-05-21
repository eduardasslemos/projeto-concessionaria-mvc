import{Carro} from "../models/Carro";

export class CarroRepository{
    private static instance : CarroRepository ;
    private carros : Carro [] = [];

    //Lista todos os carros cadastrados
    listar(): Carro[]{
        return this.carros;
    }

    //Busca o carro por id
    buscarPorId(id:number): Carro | undefined{
        return this.carros.find(carro=>carro.id_carro ===id);
    }

    //Salva o carro cadastrado
    cadastrarCarro(carros: Carro): void{
        this.carros.push(carros);
    }

    //Atualiza os dados do carro
    atualizarCarro(id: number, carro: Carro){
        const indice = this.carros.findIndex(carro=>carro.id_carro ===id );
        this.carros[indice] = carro;
    }

    //Remove o carro por id
    removerCarro(id:number): Carro | undefined{
        const indice = this.carros.findIndex(carro=>carro.id_carro ===id );

        if(indice ===-1){
            return undefined
        }

        return this.carros.splice(indice,1)[0];
    }
}