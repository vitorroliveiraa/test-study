import { queryString, parse } from './queryString';

describe('📌 Object to query string', () => {
  it('should create a valid querystring when an object is provided', () => {
    const obj = {
      name: 'vitor',
      profession: 'developer'
    }


    expect(queryString(obj)).toEqual(
      'name=vitor&profession=developer'
    );
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'vitor',
      skills: ['JS', 'TDD']
    }

    expect(queryString(obj)).toBe(
      'name=vitor&skills=JS,TDD'
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'vitor',
      skills: {
        first: 'JS',
        second: 'TDD'
      }
    }

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('📌 Query string to object', () => {
  // it('should convert a query string to object', () => {
  //   const qs = 'name=vitor&profession=developer';

  //   expect(parse(qs)).toEqual({
  //     name: 'vitor',
  //     profession: 'developer'
  //   })
  // });

  // it('should convert a query string of a single key-value pair to object', () => {
  //   const qs = 'name=vitor';

  //   expect(parse(qs)).toEqual({
  //     name: 'vitor',
  //   })
  // });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=vitor&skills=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'vitor',
      skills: ['JS', 'TDD']
    })
  });
});

/**
 * toBe() => Valor exato, mesmo tipo.
 * toEqual() => Valor diferente, mesmo tipo.
 * 
 * yarn test(jest) --coverage
 */