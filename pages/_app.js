import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import useSWR from "swr";
import { SWRConfig } from "swr";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  });

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <Layout Component={Component} pageProps={pageProps} />
    </SWRConfig>
  );
}

function Layout({ Component, pageProps }) {
  const { data: products, error } = useSWR("/api/products", fetcher);
  if (!products) return <LoadingScreen />;
  if (error) {
    return (
      <ErrorScreen
        title="Failed to load sneakers"
        message="Please refresh the page or come back in a moment."
      />
    );
  }

  return (
    <>
      <Navbar products={products} />
      <Component {...pageProps} products={products} error={error} />
      <Footer />
    </>
  );
}
