import { createEffect, createSignal } from "solid-js";
import king8 from "../assets/king8-logo.png";

function Navbar() {
  const [isDragdropOpen, setIsDragdropOpen] = createSignal(false);

  createEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest("#products-dropdown") && !event.target.closest("#dropdown-button")) {
        setIsDragdropOpen(false);
      }
    };

    if (isDragdropOpen()) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  });

  const menuItems = ["HOME", "PRODUCTS", "CONTACT US"];

  return (
    <header>
      <nav class="bg-zinc-100 px-4 lg:px-6 py-2.5 fixed w-full top-0 z-20">
        <div class="flex justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" class="flex items-center">
            <img src={king8} class="h-20" alt="Mindanao King8 Plastics Logo" />
          </a>
          <div class="flex items-center lg:order-2 relative">
            <a href="/sign-up" class="text-blue-950 bg-amber-400 hover:bg-amber-500 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">SIGN UP</a>
            <a href="/login" class="text-zinc-100 bg-blue-950 hover:bg-blue-700 font-bold border-solid border-2 border-blue-950 rounded-lg text-sm px-4 lg:px-6 py-2 lg:py-2.5 mr-2">LOG IN</a>
            <div class="relative">
              <button id="dropdown-button" onClick={() => setIsDragdropOpen(!isDragdropOpen())} type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              {isDragdropOpen() && (
                <ul id="products-dropdown" class="absolute top-full mt-2 bg-gray-100 border border-gray-200 rounded-lg shadow-lg z-10 max-w-max right-0">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={"/" + item.toLowerCase()} class="block py-2 pr-4 pl-3 font-bold text-gray-700 hover:bg-gray-400 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">{item}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul class="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
              {menuItems.map((item, index) => (
                <li key={index} class="relative group">
                  <a href={"/" + item.toLowerCase().replace(/ /g, '-')} class="block py-2 pr-4 pl-3 font-bold text-gray-700 border-b border-gray-100 hover:bg-blue-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
