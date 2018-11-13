export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  rg: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  plano: string;
  matricula: string;
  email: string;
}

export class Categoria {
  codigo: number;
  nome: string;
}

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
}

export class Despesa {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  categoria = new Categoria();
}

export class Professor {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Modalidade {
  codigo: number;
  nome: string;
}

export class ModalidadeProfessorPessoa {
  codigo: number;
  pessoa = new Pessoa();
  professor = new Professor();
  modalidade = new Modalidade();
}
