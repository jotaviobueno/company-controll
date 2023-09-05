import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import { CreateAddressInput, CreateCompanyInput } from 'src/domain/dtos';
import { CnpjResponseModel } from 'src/domain/models';

export async function getCnpj(cnpj: number) {
  const { data } = await axios.get<CnpjResponseModel>(
    `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
  );

  if ((data as any)?.error) {
    Logger.error('FAILED_TO_GET_CNPJ', (data as any).error);

    throw new HttpException(
      'Cnpj was not found or is wrong',
      HttpStatus.NOT_FOUND,
    );
  }

  const createCompanyInput: CreateCompanyInput = {
    cnpj,
    corporateName: data.razao_social,
    status: data.descricao_situacao_cadastral,
    sector: data.cnae_fiscal_descricao,
  };

  const createAddressInput: CreateAddressInput = {
    street: data.logradouro,
    number: data.numero,
    neighborhood: data.bairro,
    city: data.municipio,
    zipCode: +data.cep,
    state: data.uf,
  };

  return { createCompanyInput, createAddressInput };
}
