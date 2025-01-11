import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import apiClient from "../apiClient";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/**
 * Checks if param is UUID format
 * @param {string} uuid
 * @returns {boolean}
 */
function checkIfUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Default function to return the component
 * @returns {import("solid-js").JSXElement}
 */
function IndividualProduct() {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const [product, setProduct] = createSignal({});
  const [isReady, setIsReady] = createSignal(false);

  onMount(async () => {
    const idCheck = checkIfUUID(id);

    console.log(idCheck);
    if (!idCheck) navigate("/404", { replace: true });
    else {
      apiClient
        .get(`product/${id}`)
        .then((response) => {
          const data = response.data;
          setProduct(data);
          console.log(product());
          setIsReady(true);
        })
        .catch((err) => {
          console.error("Error fetching product:", err.message);
          navigate("/404", { replace: true });
        });
    }
  });
  return (
    <>
      {isReady() ? (
        <div>
          <Navbar />
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-center items-center h-screen">
              {/*temp fix is md:mr-48 class*/}
              <div class="flex flex-col md:flex-row md:mr-48 -mx-4">
                <div class="px-4">
                  <div class="h-[460px] rounded-lg bg-gray-300 mb-4">
                    <img
                      class="w-full h-full object-cover"
                      src={`/products/${product().image_src}`}
                      alt="Product Image"
                    />
                  </div>
                  <div class="flex -mx-2 mb-4 justify-center items-center">
                    <div class="w-1/2 px-2">
                      <button class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">
                        Inquire about this Product
                      </button>
                    </div>
                  </div>
                </div>
                <div class="md:flex-1 px-4">
                  <h2 class="text-2xl font-bold mb-2">
                    {product().name ?? "Loading item name"}
                  </h2>
                  <div class="flex mb-4">
                    <div>
                      <span class="font-bold text-black-700 ">
                        Items left:{" "}
                      </span>
                      <span class="text-black-600 ">
                        {product().num_left ?? "Loading item quantity..."}
                      </span>
                    </div>
                  </div>
                  <div class="mb-4">
                    <span class="font-bold text-black-700 ">Select Color:</span>
                    <div class="flex items-center mt-2">
                      <button class="w-6 h-6 rounded-full bg-gray-800  mr-2"></button>
                      <button class="w-6 h-6 rounded-full bg-red-500  mr-2"></button>
                      <button class="w-6 h-6 rounded-full bg-blue-500  mr-2"></button>
                      <button class="w-6 h-6 rounded-full bg-yellow-500  mr-2"></button>
                    </div>
                  </div>
                  <div>
                    <span class="font-bold text-black-700 ">
                      Product Description:
                    </span>
                    <p class="text-black-600 text-sm mt-2">
                      {product().description ?? "Loading description..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div class="flex justify-center items-center h-screen w-full">
          Loading content...
        </div>
      )}
    </>
  );
}

export default IndividualProduct;
