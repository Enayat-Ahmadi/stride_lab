import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import useSWR from "swr";
import Loader from "@/components/Loader";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: products, error, isLoading } = useSWR("/api/products", fetcher);
  if (isLoading) return <Loader />;
  if (error) return <h3>error</h3>;

  return (
    <>
      <Navbar products={products} />
      <Component {...pageProps} products={products} error={error} />
      <Footer />
    </>
  );
}
