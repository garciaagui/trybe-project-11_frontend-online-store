const CART_ITEMS_KEY = 'cart_items';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(CART_ITEMS_KEY))) {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
}

const saveInCart = (ItemToSave) => localStorage
  .setItem(CART_ITEMS_KEY, JSON.stringify(ItemToSave));

const readItemsSaved = () => JSON.parse(localStorage.getItem(CART_ITEMS_KEY));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getCartItems = () => new Promise((resolve) => {
  const itemsSaved = readItemsSaved();
  simulateRequest(itemsSaved)(resolve);
});

export const addItem = (item) => new Promise((resolve) => {
  if (item) {
    const itemsSaved = readItemsSaved();
    saveInCart([...itemsSaved, item]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeItem = (item) => new Promise((resolve) => {
  const itemsSaved = readItemsSaved();
  saveInCart(itemsSaved.filter((i) => i.id !== item.id));
  simulateRequest(SUCCESS_STATUS)(resolve);
});

// Tive que criar uma função, pois a removeItem eliminava todos as unidades do item. Segue explicação:
// 1o: Para conseguir a qtd do item no carrinho, utilizei a mesma lógica aplicada no ShoppingCart;
// 2o: Vi o pessoal comentando que, caso a qtd do item seja "1", o botão não deveria diminuir a qtd (no caso, excluir o item). Criei a lógica, mas mesmo assim não passou nos testes;
// 3o: Se a qtd for maior que 1, extraio a posição no array (LocalStorage) do primeiro elemento cujo id é igual ao do produto que desejamos eliminar. Em seguida, retiro ele do array via filter.
export const decreaseItem = (item) => new Promise((resolve) => {
  const itemsSaved = readItemsSaved();
  const itemQuantity = itemsSaved.filter((i) => i.id === item.id).length;
  if (itemQuantity > 1) {
    const itemIndex = itemsSaved.indexOf(itemsSaved.find((i) => i.id === item.id));
    saveInCart(itemsSaved.filter((_, index) => itemIndex !== index));
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});
