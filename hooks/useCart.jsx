import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useCart() {
  const [productCart, setProductCart] = useLocalStorage("cart", []);
  const [success, setSuccess] = useState(false);

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
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }
  function removeFromCart(productId) {
    setProductCart(productCart.filter((item) => item.id !== productId));
  }
  function increaseQuantity(productId) {
    setProductCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }
  function decreaseQuantity(productId) {
    setProductCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  function clearCart() {
    setProductCart([]);
  }
  return {
    productCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    success,
  };
}
