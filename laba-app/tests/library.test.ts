import { expect } from 'chai';
import { Library } from '../src/services/Library';
import { IIdentifiable } from '../src/types';

interface TestItem extends IIdentifiable {
  name: string;
}

describe('Library<T> Generic Service', () => {
  let library: Library<TestItem>;

  beforeEach(() => {
    library = new Library<TestItem>([
      { id: '1', name: 'Item One' },
      { id: '2', name: 'Item Two' },
    ]);
  });

  it('повинен додавати новий елемент у колекцію', () => {
    library.add({ id: '3', name: 'Item Three' });
    expect(library.getAll().length).to.equal(3);
    expect(library.findById('3')?.name).to.equal('Item Three');
  });

  it('повинен знаходити обʼєкт за ID', () => {
    const item = library.findById('1');
    expect(item).to.deep.equal({ id: '1', name: 'Item One' });
  });

  it('повинен коректно видаляти обʼєкт за ID', () => {
    const removed = library.remove('2');
    expect(removed).to.be.true;
    expect(library.findById('2')).to.be.undefined;
    expect(library.getAll().length).to.equal(1);
  });

  it('повинен повертати false при спробі видалити неіснуючий обʼєкт', () => {
    const removed = library.remove('999');
    expect(removed).to.be.false;
  });

  it('повинен коректно фільтрувати елементи через search', () => {
    const results = library.search((item) => item.name.includes('One'));
    expect(results.length).to.equal(1);
    expect(results[0].id).to.equal('1');
  });
});