import { createSignal, onMount } from "solid-js";
import apiClient from "../apiClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import header from "/products/5756d88f-03d2-43b0-872a-5fa79a008bad.b0af22da54ce948d42e286678c02fc87.webp"

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
    <div className="relative bg-zinc-100 w-full h-full sm:w-full sm:h-screen">
      <Navbar />

      <div className="w-screen h-72 relative bg-stone-950 mt-24">
        <div className="w-screen h-24 font-extrabold top-20 flex justify-center items-center text-zinc-100 text-5xl absolute z-10">
          PRODUCTS
        </div>
        <div className="w-screen h-24 font-normal top-40 text-center text-zinc-100 md:text-2xl sm:text-xl absolute  z-10">
          Check out our quality made products! Inquire now for more!
        </div>
        {/*<img className="w-screen h-72 opacity-35 absolute" src={header} />*/}
      </div>

      <div className="w-screen h-24 relative bg-blue-950">
        <form className="mx-auto max-w-md relative top-5">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-blue-950"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-zinc-100 focus:ring-blue-950 focus:border-blue-950 "
              placeholder="Search Products..."
              required
            />
            <button
              type="submit"
              className="text-blue-950 absolute end-2.5 bottom-2.5 bg-amber-400 hover:bg-blue-950 hover:text-zinc-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="w-full relative bg-zinc-100">
        <div className="flex justify-center h-auto mb-16 relative top-8 md:top-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products().map((product) => (
              <a href={`/product/${product.id}`} key={product.id}>
                <div className="h-72 w-80 rounded-lg bg-blue-950 flex justify-center relative hover:opacity-50">
                  <img src={`../../public/products/${product.image_src}`} />
                  <h3 className="font-extrabold text-2xl justify-center text-center text-zinc-100 top-60 mt-2 absolute">
                    {product.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Products;
