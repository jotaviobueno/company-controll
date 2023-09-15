import axios from 'axios';
import { getCnpj } from './get-cnpj';

describe('getCnpj', () => {
  it('returns createCompanyInput and createAddressInput for a valid CNPJ', async () => {
    const mockResponse = {
      razao_social: 'Nome da Empresa',
      descricao_situacao_cadastral: 'Ativa',
      cnae_fiscal_descricao: 'Descrição do Setor',
      logradouro: 'Rua Exemplo',
      numero: '123',
      bairro: 'Bairro Exemplo',
      municipio: 'Cidade Exemplo',
      cep: '12345678',
      uf: 'SP',
    };

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve({
        data: mockResponse,
      }),
    );

    const result = await getCnpj('12345678901234');

    expect(result).toEqual({
      createCompanyInput: {
        cnpj: '12345678901234',
        corporateName: 'Nome da Empresa',
        status: 'Ativa',
        sector: 'Descrição do Setor',
      },
      createAddressInput: {
        street: 'Rua Exemplo',
        number: '123',
        neighborhood: 'Bairro Exemplo',
        city: 'Cidade Exemplo',
        zipCode: 12345678,
        state: 'SP',
      },
    });
  });

  it('throws an error for an invalid CNPJ', async () => {
    const mockResponse = {
      error: 'CNPJ not found',
    };

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve({
        data: mockResponse,
      }),
    );

    const invalidCnpj = 'invalid_cnpj';

    await expect(getCnpj(invalidCnpj)).rejects.toThrowError(
      'Cnpj was not found or is wrong',
    );
  });
});
