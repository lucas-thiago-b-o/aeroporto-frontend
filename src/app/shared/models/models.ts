export interface AeroportoDTO {
    id: number;
    nome: string;
    codigoAeroportuario: string;
    cidade: CidadeDTO;
}

export interface AssentoDTO {
    id: number;
    nome: string;
}

export interface BagagemDTO {
    id: number;
    numeroIdentificacao: string;
    isDespachada: boolean;
}

export interface CidadeDTO {
    id: number;
    nome: string;
    uf: UfDTO;
}

export interface ClasseDTO {
    id: number;
    nome: string;
    assentos: AssentoDTO[];
    voo: VooDTO;
}

export interface ComprarPassagemDTO {
    passagemDTO: PassagemDTO;
    passageirosAssentoDTO: PassageiroAssentoDTO[];
}

export interface PassageiroAssentoDTO {
    passageiroDTO: PassageiroDTO;
    classeId: number;
}

export interface PassageiroDTO {
    id: number;
    nomeCompleto: string;
    cpf: number;
    rg: number;
    passaporte: number;
    dataNascimentodataNascimento: Date;
    telefone: number;
    contatoEmergencia: number;
    bagagens: BagagemDTO[];
}

export interface PassagemDTO {
    id: number;
    portaoEmbarque: string;
    uuidUsuario: string;
    dataHoraVoo: Date;
    valor: number;
    numeroIdentificacao: string;
    classe: ClasseDTO;
}

export interface UfDTO {
    id: number;
    nome: string;
}

export interface VooDTO {
    id: number;
    nome: string;
    status: string;
    valor: number;
    dataHoraMarcado: Date;
    dataHoraPartida: Date;
    dataHoraPrevisao: Date;
    dataHoraChegada: Date;
    aeroportoOrigem: AeroportoDTO;
    aeroportoDestino: AeroportoDTO;
}