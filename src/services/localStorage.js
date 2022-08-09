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

export const readSavedComments = (id) => JSON.parse(localStorage.getItem(id));

export const saveComment = (id, ItemToSave) => localStorage
  .setItem(id, JSON.stringify(ItemToSave));

export const addReview = (id, obj) => {
  const commentsSaved = readSavedComments(id);
  saveComment(id, [...commentsSaved, obj]);
};
