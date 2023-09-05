import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
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

  return {
    cnpj: +data.cnpj,
    corporateName: data.razao_social,
    status: data.descricao_situacao_cadastral,
    sector: data.cnae_fiscal_descricao,
  };
}
