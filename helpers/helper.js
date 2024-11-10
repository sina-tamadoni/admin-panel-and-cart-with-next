export const sumProducts = (products) => {
  const productsQuantity = products.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  return { productsQuantity, totalPrice };
};
