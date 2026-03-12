import { useLocalStorage } from "@uidotdev/usehooks";

export default function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  }
  function isWishlisted(productId) {
    return wishlist.includes(productId);
  }
  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
  };
}
