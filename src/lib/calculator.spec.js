import { sum } from './calculator';

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('should sum 2 and 2 even if one of them is a string...', () => {
  expect(sum('2', '2')).toBe(4);
});

it('should throw an error if what is provided to the method...', () => {
  expect(() => {
    sum('', 2)
  }).toThrowError();
});

/**
 * Utilizar .not no expect serve como forma de negação do espero pelo expected
 * e também auxilia no debug de certa forma, porque podemos usar para ver o que
 * realmente está acontecendo nos testes. Exemplo:
 * ? Expected: not "name=vitor&skills=JS,TDD"
 * esse resultado que costuma aparecer mostrando o que está sendo enviado
*/