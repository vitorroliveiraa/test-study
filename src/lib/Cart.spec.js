import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let product = {
    title: "Adidas running shoes - men",
    price: 35388,
  };
  let product2 = {
    title: "Adidas running shoes - men",
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe("getTotal()", () => {
    it("should return 0 when getTotal() is executed in a newly created instance", () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it("should multiply quantity and price and receive the local amount", () => {
      const item = {
        product: {
          title: "Adidas running shoes - men",
          price: 35388, // 35388 | R$ 353,88
        },
        quantity: 2, // 70776
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should ensure no more than on product exists at a time", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it("should update total when a product gets included and then removed", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe("checkout()", () => {
    it("should return an object with the total and the list of items", () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas running shoes - men",
              },
              "quantity": 3,
            },
          ],
          "total": 196392,
        }
      `);
    });

    it("should return an object with the total and the list of items when summary() is called", () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
      expect(cart.summary()).toMatchInlineSnapshot(`
        Object {
          "formatted": "R$ 3.025,56",
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 5,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas running shoes - men",
              },
              "quantity": 3,
            },
          ],
          "total": Object {
            "amount": 302556,
            "currency": "BRL",
            "precision": 2,
          },
        }
      `);
    });

    it("should include formatted amount in the summary", () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary().formatted.replace(/\s+/g, '')).toEqual('R$3.025,56');
    });

    it("should reset the cart when checkout() is called", () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe("Special Conditions", () => {
    it("should apply percentage discount quantity above minimum is passed", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it("should NOT apply percentage discount quantity is below or equals minimum", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should apply quantity discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should NOT apply quantity discount for even quantities when condition is not met", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it("should apply quantity discount for add quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it("should receive two or more conditions and determine/apply the best discount. First case.", () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it("should receive two or more conditions and determine/apply the best discount. Secound case.", () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});

/**
 * ? beforeEach
 * Antes de cada teste
 * ? fit
 * Ignora os demais testes
 * ? toMatchInlineSnapshot()
 * Devolve um snapshot do que um método retorna mas se retorno for muito
 * grande, pode acabar compensando usar o: toMatchSnapshot() que vai criar
 * uma pasta com snaps, que seriam os resultados esperados
 * ? Update snapshot com letra U
 * Para atualizar em watch mode, basta utilizar a letra u
 * ? toBeGreaterThan
 * Espero que seja maior que o espero passado como parâmetro
 */
