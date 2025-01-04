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
    <div class="relative bg-zinc-100 w-full h-full sm:w-full sm:h-screen">
      <Navbar />

      <div class="w-full h-72 relative bg-stone-950 mt-24">
        <div class="w-full h-24 font-extrabold top-20 flex justify-center items-center text-zinc-100 text-5xl absolute z-10">
          PRODUCTS
        </div>
        <div class="w-full h-24 font-normal top-40 text-center text-zinc-100 md:text-2xl sm:text-xl absolute  z-10">
          Check out our quality made products! Inquire now for more!
        </div>
        {/*<img class="w-screen h-72 opacity-35 absolute" src={header} />*/}
      </div>

      <div class="w-full h-24 relative bg-blue-950">
        <form class="mx-auto max-w-md relative top-5">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-blue-950"
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
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-zinc-100 focus:ring-blue-950 focus:border-blue-950 "
              placeholder="Search Products..."
              required
            />
            <button
              type="submit"
              class="text-blue-950 absolute end-2.5 bottom-2.5 bg-amber-400 hover:bg-blue-950 hover:text-zinc-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* actual product showcase */}
      <div class="w-full relative bg-zinc-100">
        {products().length !== 0 ? (
          /* displays the products if there are any */
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 my-5">
            {products().map((product) => (
              <div class="mx-3 bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
                <div class="mb-4 bg-gray-100 rounded p-2">
                  <img
                    src={`/products/${product.image_src}`}
                    alt={product.name}
                    class="aspect-[33/35] w-full object-contain"
                  />
                </div>

                <div>
                  <div class="flex gap-2">
                    <h5 class="text-base font-bold text-gray-800">
                      {product.name}
                    </h5>
                  </div>
                  <div class="flex items-center gap-2 mt-4">
                    <div
                      class="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        class="fill-pink-600 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <button
                      type="button"
                      class="text-sm px-2 h-9 font-semibold w-full bg-blue-900 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                    >
                      Request Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* informs the client that there are no products yet */
          <div class="text-center h-[calc(100vh-30rem)] flex items-center justify-center flex-col">
            <div class="text-gray-500 font-bold text-2xl">
              No products uploaded yet :(
            </div>
            <div class="text-gray-400">
              Please come back later. Sorry for the inconvenience.
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
