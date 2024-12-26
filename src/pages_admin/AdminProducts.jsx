import { createEffect, createSignal } from "solid-js";
import * as yup from "yup";
//import AdminHeader from "../components/AdminHeader";

const schema = yup.object().shape({
  product_name: yup
    .string()
    .min(2, "Name must be more than 2 characters")
    .max(40, "Name must be less than 40 characters")
    .required("Product name is required"),

  num_left: yup.number().required("Number of items left is required"),

  description: yup.string().required("Description is required"),
});

export default function AdminProducts() {
  const [productName, setProductName] = createSignal("");
  const [numLeft, setNumLeft] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [imageFile, setImageFile] = createSignal(null);
  const [products, setProducts] = createSignal([]);
  const [selectedProd, setSelectedProd] = createSignal({});

  const [isEditModalOpen, setIsEditModalOpen] = createSignal(false);
  const [isAddModalOpen, setIsAddModalOpen] = createSignal(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = createSignal(false);
  const [isConfirmEditOpen, setIsConfirmEditOpen] = createSignal(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = createSignal(false);

  const openAdd = () => {
    console.log("Confirm adding product");
    setIsConfirmModalOpen(true);
  };
  const handleSend = async (e) => {
    console.log("Finshed add products form");
    e.preventDefault();

    const addFormData = {
      product_name: productName(),
      num_left: numLeft(),
      description: description(),
      image_url: imageFile(),
    };

    try {
      await schema.validate(addFormData, { abortEarly: false });
      const response = await fetch("/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      });

      if (response.ok) {
        console.log("Product successfully added");
        const newProduct = await response.json();
        setProducts([...products(), newProduct]);

        setProductName("");
        setNumLeft("");
        setDescription("");
        setImageFile(null);
      } else {
        console.error("Failed to add product");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
    closeAddProduct();
  };
  const closeAddProduct = () => {
    setIsAddModalOpen(false);
    setIsConfirmModalOpen(false);
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch("/products-admin");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  createEffect(() => {
    fetchProducts();
  });

  const openUpdate = (product) => {
    console.log("Confirming product changes");
    setSelectedProd(product);
    setProductName(product.product_name);
    setNumLeft(product.num_left);
    setDescription(product.description);
    setImageFile(product.image_url);
    setIsConfirmEditOpen(true);
  };

  const handleUpdate = async (e) => {
    console.log("Finshed update products form");
    e.preventDefault();
    const updateFormData = {
      product_name: productName(),
      num_left: numLeft(),
      description: description(),
      image_url: imageFile(),
    };

    const productId = selectedProd().id;

    try {
      await schema.validate(updateFormData, { abortEarly: false });
      const response = await fetch(`/update-product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFormData),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        const updatedProduct = await response.json();
        setProducts(
          products().map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        );

        setProductName("");
        setNumLeft("");
        setDescription("");
        setImageFile(null);
      } else {
        console.error("Error updating product");
        throw new Error("Error updating product");
      }
    } catch (err) {
      if (err) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
      }
    }

    closeUpdate();
  };

  const closeUpdate = () => {
    setIsEditModalOpen(false);
    setIsConfirmEditOpen(false);
  };

  const openDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    const productId = selectedProd().id;

    try {
      const response = await fetch(`/delete-product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted successfully");
        setProducts(products().filter((product) => product.id !== productId));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
    closeWindow();
  };

  const closeWindow = () => {
    setIsEditModalOpen(false);
    setIsConfirmDeleteOpen(false);
  };

  const openEditWindow = (product) => {
    setSelectedProd(product);
    setIsEditModalOpen(true);
  };
  const closeEditWindow = () => setIsEditModalOpen(false);
  const openConfirmAddWindow = () => setIsConfirmModalOpen(true);
  const closeConfirmAddWindow = () => setIsConfirmModalOpen(false);
  const openAddWindow = () => setIsAddModalOpen(true);
  const closeAddWindow = () => setIsAddModalOpen(false);
  const openConfirmEdit = () => setIsConfirmEditOpen(true);
  const closeConfirmEdit = () => setIsConfirmEditOpen(false);
  const openConfirmDelete = () => setIsConfirmDeleteOpen(true);
  const closeConfirmDelete = () => setIsConfirmDeleteOpen(false);

  return (
    <div className="relative bg-zinc-100 w-full h-full sm:w-full sm:h-screen">
      <section className="py-1 bg-zinc-100">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-12">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-extrabold text-base text-blue-950">
                    Product Editor
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    onClick={openAddWindow}
                    className="active:bg-blue-950 active:text-zinc-100 text-xs font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Add product
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6  text-blue-950 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Image
                    </th>
                    <th className="px-6  text-blue-950 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Product name
                    </th>
                    <th className="px-6   text-blue-950 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Description
                    </th>
                    <th className="px-6   text-blue-950 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Items Left
                    </th>
                    <th className="px-6   text-blue-950 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ---
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products().map((product) => (
                    <tr key={product.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {product.image_src}
                      </td>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {product.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {product.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {product.num_left}
                      </td>
                      <td>
                        <button
                          onClick={() => openEditWindow(product)}
                          className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs underline whitespace-nowrap p-4"
                          type="button"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isAddModalOpen() && (
                <div class="fixed top-0 left-0 w-full sm:h-full h-full px-4 flex justify-center items-center">
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />

                  <div class="absolute bg-gray-100 rounded-lg p-8 shadow-lg">
                    <div class="modal-content flex justify-center items-center bg-zinc-100">
                      <form action="#" class="w-full">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                          <h3 class="text-lg font-semibold text-gray-900">
                            Add product
                          </h3>
                          <button
                            type="button"
                            onClick={closeAddWindow}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="defaultModal"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                          </button>

                          <div>
                            <label
                              for="name"
                              class="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="product_name"
                              value={productName()}
                              onInput={(e) => setProductName(e.target.value)}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Type product name"
                              required
                            />
                            <div className="mt-4">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900   "
                              >
                                Items left:
                              </label>
                              <input
                                type="text"
                                name="num_left"
                                id="num_left"
                                value={numLeft()}
                                onInput={(e) => setNumLeft(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type quantity"
                                required
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900   "
                              >
                                Image:
                              </label>
                              <input
                                type="file"
                                id="imageUpload"
                                value={imageFile()}
                                onChange={(eve) => {
                                  const file = eve.target.files[0];

                                  file && setImageFile(file);
                                }}
                                name="image"
                                accept="image/*"
                                required
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              for="description"
                              className="block mb-2 text-md font-medium text-blue-950"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              value={description()}
                              onInput={(e) => setDescription(e.target.value)}
                              rows="6"
                              className="block p-2.5 w-full text-sm text-blue-950 bg-grey-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Your description here"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={openAdd}
                            type="button"
                            class="text-zinc-100 inline-flex items-center bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 mt-2 justify-center w-full"
                          >
                            Add product
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {isEditModalOpen() && (
                <div class="lg:fixed md:fixed top-0 left-0 w-full h-full px-4 flex justify-center items-center">
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />

                  <div class="absolute bg-gray-100 rounded-lg p-8 shadow-lg max-w-lg w-full">
                    <div class="modal-content flex justify-center items-center bg-zinc-100">
                      <form action="#" class="w-full" onSubmit={handleUpdate}>
                        <div class="grid gap-4 mb-4 md:grid-cols-2 sm:grid-cols-2">
                          <h3 class="text-lg font-semibold text-gray-900">
                            Edit product
                          </h3>
                          <button
                            type="button"
                            onClick={closeEditWindow}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="defaultModal"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                          </button>

                          <div>
                            <label
                              for="name"
                              class="block mb-2 text-sm font-medium text-gray-900 "
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              onInput={(e) => setProductName(e.target.value)}
                              value={selectedProd().name}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Type name"
                              required=""
                            />
                            <div className="mt-4">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900   "
                              >
                                Items left
                              </label>
                              <input
                                type="text"
                                name="num_left"
                                id="num_left"
                                onInput={(e) => setNumLeft(e.target.value)}
                                value={selectedProd().num_left}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type quantity"
                                required=""
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900   "
                              >
                                Image URL:
                              </label>
                              <input
                                type="text"
                                name="image_url"
                                id="image_url"
                                value={selectedProd().image_src}
                                onInput={(e) => setImageFile(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Enter link"
                                required
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              for="description"
                              className="block mb-2 text-md font-medium text-blue-950"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              rows="6"
                              value={selectedProd().description}
                              onInput={(e) => setDescription(e.target.value)}
                              className="block p-2.5 w-full text-sm text-blue-950 bg-grey-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Your description here"
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            class="text-zinc-100 inline-flex  items-center bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  px-4 py-2.5 justify-center"
                          >
                            Confirm changes
                          </button>
                          <button
                            type="button"
                            onClick={openDelete}
                            class="text-zinc-100 items-center bg-red-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 ml-4 justify-center"
                          >
                            Delete product
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {isConfirmModalOpen() && (
                <div className="fixed top-0 left-0 w-full h-full px-4 flex justify-center items-center">
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />

                  <div className="absolute h-40 w-96 shadow-lg p-4 mb-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50">
                    <div class="flex items-center">
                      <svg
                        class="flex-shrink-0 w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span class="sr-only">Info</span>
                      <h3 class="text-lg font-medium">Confirm</h3>
                    </div>
                    <div class="mt-2 mb-4 text-sm">
                      Do you wish to continue adding this product?
                    </div>
                    <div class="flex">
                      <button
                        onClick={handleSend}
                        type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
                      >
                        Create
                      </button>
                      <button
                        onClick={closeConfirmAddWindow}
                        type="button"
                        class="text-gray-800 bg-transparent border border-gray-800 hover:bg-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
                        data-dismiss-target="#alert-additional-content-2"
                        aria-label="Close"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isConfirmEditOpen() && (
                <div className="fixed top-0 left-0 w-full h-full px-4 flex justify-center items-center">
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />

                  <div className="absolute h-40 w-96 shadow-lg p-4 mb-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50">
                    <div class="flex items-center">
                      <svg
                        class="flex-shrink-0 w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span class="sr-only">Info</span>
                      <h3 class="text-lg font-medium">Confirm changes?</h3>
                    </div>
                    <div class="mt-2 mb-4 text-sm">
                      Do you wish to continue revising your changes?
                    </div>
                    <div class="flex">
                      <button
                        onClick={handleUpdate}
                        type="button"
                        class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
                      >
                        Yes, Continue
                      </button>
                      <button
                        onClick={closeConfirmEdit}
                        type="button"
                        class="text-gray-800 bg-transparent border border-gray-800 hover:bg-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
                        data-dismiss-target="#alert-additional-content-2"
                        aria-label="Close"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isConfirmDeleteOpen() && (
                <div className="fixed top-0 left-0 w-full h-full px-4 flex justify-center items-center">
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />

                  <div className="absolute h-40 w-96 shadow-lg p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
                    <div class="flex items-center">
                      <svg
                        class="flex-shrink-0 w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span class="sr-only">Info</span>
                      <h3 class="text-lg font-medium">Confirm changes?</h3>
                    </div>
                    <div class="mt-2 mb-4 text-sm">
                      Do you wish to delete product?
                    </div>
                    <div class="flex">
                      <button
                        onClick={handleDelete}
                        type="button"
                        class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
                      >
                        Yes, Continue
                      </button>
                      <button
                        onClick={closeConfirmDelete}
                        type="button"
                        class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
                        data-dismiss-target="#alert-additional-content-2"
                        aria-label="Close"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
