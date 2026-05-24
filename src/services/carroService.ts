import{Carro} from "../models/Carro";
import{CarroRepository} from "../repositories/carroRepository";
import {EstoqueRepository} from "../repositories/estoqueRepository";
import{NotaFiscalRepository} from "../repositories/notaFiscalRepository";

export class CarroService{
    CarroRepository = new CarroRepository();
    estoqueRepository = EstoqueRepository.getInstance();
    notaFiscalRepository = NotaFiscalRepository.getInstance();
    

    listar(): Carro[]{
        return this.CarroRepository.listar();
    }

    buscarPorId(id: number): Carro | undefined{
        return this.CarroRepository.buscarPorId(id);
    }

    listarDisponiveis(): Carro[] {
        const estoques =this.estoqueRepository.listarDisponiveis();
        const carrosDisponiveis =estoques.map(estoque => {
            return this.CarroRepository.buscarPorId(estoque.id_carro);
        });
        return carrosDisponiveis.filter(carro => carro !== undefined) as Carro[];
}

    CadastrarCarro(data:any): Carro{
        if (!data.marca|| !data.modelo || !data.ano || !data.placa || !data.preco || !data.preco) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }

        const anoAtual = new Date().getFullYear();

        if(data.ano<1950 || data.ano > anoAtual+1){
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }

        if(data.preco<=0){
            throw new Error("Preço deve ser maior que zero");
        }

        const placaExistente = this.CarroRepository.buscaPorPlaca(data.placa);

        if(placaExistente){
            throw new Error("Já existe um carro com essa placa");
        }

        const carro = new Carro(data.marca, data.modelo, data.ano, data.placa, data.preco, data.cor);
        this.CarroRepository.cadastrarCarro(carro)
        return carro;
}

    atualizarCarro(id:number, data: any):Carro{
        const carro = this.CarroRepository.buscarPorId(id);

        if(!carro){
            throw new Error("Carro não encontrado");
        }

        if (!data.marca|| !data.modelo || !data.ano || !data.placa || !data.preco || !data.cor) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }

        const anoAtual = new Date().getFullYear();

        if(data.ano<1950 || data.ano > anoAtual+1){
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }

        if(data.preco<=0){
            throw new Error("Preço deve ser maior que zero");
        }

        const placaExistente = this.CarroRepository.buscaPorPlaca(data.placa);

        if(placaExistente && placaExistente.id_carro !==id){
            throw new Error("Já existe um carro com essa placa");
        }

        const carroAtualizado = this.CarroRepository.atualizarCarro(id, data);

        return carroAtualizado;
    }

    removerCarro(id:number): Carro | undefined{
        const carro = this.CarroRepository.buscarPorId(id);

        if(!carro){
            throw new Error("Carro não encontrado");
        }

        const estoqueVinculado = this.estoqueRepository.buscarPorCarro(id);

        if(estoqueVinculado && estoqueVinculado.quantidade > 0){
            throw new Error("Não se pode remover carro com estoque vinculado");
        }
        //Revisar isso com a duda
        const notaVinculada = this.notaFiscalRepository.filtraNotaPorId(id);

        if(notaVinculada){
            throw new Error("Não se pode remover carro com nota fiscal vinculado");
        }

        return this.CarroRepository.removerCarro(id);
    }
}