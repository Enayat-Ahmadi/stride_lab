import { useLocalStorage } from "@uidotdev/usehooks";

export default function useCart() {
  const [productCart, setProductCart] = useLocalStorage("cart", []);

  function addToCart(productId) {
    const isExist = productCart.find((item) => item.id === productId);
    if (isExist) {
      setProductCart(
        productCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setProductCart([...productCart, { id: productId, quantity: 1 }]);
    }
  }
  function removeFromCart(productId) {
    setProductCart(productCart.filter((item) => item.id !== productId));
  }
  function increaseQuantity(productId) {
    setProductCart(
      productCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity + 1 } : item,
      ),
    );
  }
  function decreaseQuantity(productId) {
    setProductCart(
      productCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  return {
    productCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
}
