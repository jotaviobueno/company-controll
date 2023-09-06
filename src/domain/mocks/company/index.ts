import { CreateCompanyInput, UpdateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { CnpjResponseModel } from 'src/domain/models';

export const companyMock: CompanyEntity = {
  cnpj: '10',
  corporateName: 'test',
  status: 'test',
  sector: 'test',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createCompanyInputMock: CreateCompanyInput = {
  cnpj: '10',
  corporateName: 'test',
  status: 'test',
  sector: 'test',
};

export const updateCompanyInputMock: UpdateCompanyInput = {};

export const cnpjResponseModelMock: CnpjResponseModel = {
  uf: 'RJ',
  cep: '22250040',
  qsa: [],
  cnpj: '10',
  pais: null,
  email: null,
  porte: 'DEMAIS',
  bairro: 'BOTAFOGO',
  numero: '374',
  ddd_fax: '',
  municipio: 'RIO DE JANEIRO',
  logradouro: 'DE BOTAFOGO',
  cnae_fiscal: 1099699,
  codigo_pais: null,
  complemento: 'ANDAR 12 PARTE',
  codigo_porte: 5,
  razao_social: 'test',
  nome_fantasia: '',
  capital_social: 150458420,
  ddd_telefone_1: '2125591000',
  ddd_telefone_2: '2125591261',
  opcao_pelo_mei: null,
  descricao_porte: '',
  codigo_municipio: 6001,
  cnaes_secundarios: [
    {
      codigo: 1096100,
      descricao: 'Fabricação de alimentos e pratos prontos',
    },
  ],
  natureza_juridica: 'Sociedade Empresária Limitada',
  situacao_especial: '',
  opcao_pelo_simples: null,
  situacao_cadastral: 2,
  data_opcao_pelo_mei: null,
  data_exclusao_do_mei: null,
  cnae_fiscal_descricao: 'test',
  codigo_municipio_ibge: 3304557,
  data_inicio_atividade: '1971-12-24',
  data_situacao_especial: null,
  data_opcao_pelo_simples: null,
  data_situacao_cadastral: '2005-11-03',
  nome_cidade_no_exterior: '',
  codigo_natureza_juridica: 2062,
  data_exclusao_do_simples: null,
  motivo_situacao_cadastral: 0,
  ente_federativo_responsavel: '',
  identificador_matriz_filial: 1,
  qualificacao_do_responsavel: 5,
  descricao_situacao_cadastral: 'test',
  descricao_tipo_de_logradouro: 'PRAIA',
  descricao_motivo_situacao_cadastral: 'SEM MOTIVO',
  descricao_identificador_matriz_filial: 'MATRIZ',
};
