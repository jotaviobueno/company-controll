import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IBaseDataloader } from 'src/domain/base';
import { PersonEntity } from 'src/domain/entities';
import { InvoicePersonFindManyWithInvoicesIdsUseCase } from 'src/modules/invoice-person/use-cases';
import { PersonFindManyWithIdsUseCase } from 'src/modules/person/use-cases';

@Injectable()
export class LoaderPersonByInvoiceId
  implements IBaseDataloader<string, PersonEntity>
{
  dataLoader: DataLoader<string, PersonEntity[]>;

  constructor(
    private readonly invoicePersonFindManyWithInvoicesIdsUseCase: InvoicePersonFindManyWithInvoicesIdsUseCase,
    private readonly personFindManyWithIdsUseCase: PersonFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, PersonEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<PersonEntity[][]> {
    const invoicePersons =
      await this.invoicePersonFindManyWithInvoicesIdsUseCase.execute(data);

    const personsIds = invoicePersons.map(
      (invoiceperson) => invoiceperson.personId,
    );

    const persons = await this.personFindManyWithIdsUseCase.execute(personsIds);

    const personsMap: Record<string, PersonEntity[]> = {};

    invoicePersons.forEach((invoicePerson) => {
      persons.forEach((person) => {
        if (!personsMap[invoicePerson.invoiceId])
          personsMap[invoicePerson.invoiceId] = [];

        if (person.id === invoicePerson.personId)
          personsMap[invoicePerson.invoiceId].push(person);
      });
    });

    return data.map((id) => personsMap[id] ?? []);
  }

  load(data: string): Promise<PersonEntity[]> {
    return this.dataLoader.load(data);
  }
}
