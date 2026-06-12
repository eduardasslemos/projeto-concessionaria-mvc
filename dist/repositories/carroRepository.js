"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroRepository = void 0;
class CarroRepository {
    static instance;
    carros = [];
    static getInstance() {
        if (!CarroRepository.instance) {
            CarroRepository.instance = new CarroRepository();
        }
        return CarroRepository.instance;
    }
    //Lista todos os carros cadastrados
    listar() {
        return this.carros;
    }
    //Busca o carro por id
    buscarPorId(id) {
        return this.carros.find(carro => carro.id_carro === id);
    }
    //Busca o carro por placa para fazer a checagem no service
    buscaPorPlaca(placa) {
        return this.carros.find(carro => carro.placa === placa);
    }
    //Salva o carro cadastrado
    cadastrarCarro(carros) {
        this.carros.push(carros);
    }
    //Atualiza os dados do carro
    atualizarCarro(id, carro) {
        const indice = this.carros.findIndex(carro => carro.id_carro === id);
        carro.id_carro = id;
        this.carros[indice] = carro;
        return this.carros[indice];
    }
    //Remove o carro por id
    removerCarro(id) {
        const indice = this.carros.findIndex(carro => carro.id_carro === id);
        if (indice === -1) {
            return undefined;
        }
        return this.carros.splice(indice, 1)[0];
    }
}
exports.CarroRepository = CarroRepository;
