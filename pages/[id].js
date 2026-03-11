import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  if (error) return <p>error</p>;
  if (isLoading) return <p>isLoading...</p>;
  console.log(product);
  return (
    <div className="h-screen w-full flex flex-col gap-10 items-center ">
      <h1>this is Details page</h1>
      <h3>product id: {id}</h3>
    </div>
  );
};
export default Details;
