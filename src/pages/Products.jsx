import { createSignal, onMount } from "solid-js";
import apiClient from "../apiClient";

function Products() {
  const [products, setProducts] = createSignal([]);

  onMount(() => {
    apiClient
      .get("product/get-products")
      .then((response) => {
        const data = response.data;
        setProducts(data);
        console.log(products());
      })
      .catch((err) => {
        console.error("Error fetching products:", err.message);
      });
  });

  return (
    <>
      <h1 class="font-bold text-4xl">Products' Page</h1>
      <div>
        {products().map((el) => (
          <p>{el}</p>
        ))}
      </div>
    </>
  );
}

export default Products;
