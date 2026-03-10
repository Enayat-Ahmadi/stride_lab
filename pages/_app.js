import "@/styles/globals.css";
import useSWR from "swr";
import Navbar from "@/Components/Navbar/Navbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: products, error, isLoading } = useSWR("/api/products", fetcher);
  if (isLoading) return <h3>isLoading...</h3>;
  if (error) return <h3>error</h3>;

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
