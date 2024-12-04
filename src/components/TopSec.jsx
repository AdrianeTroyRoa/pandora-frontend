import background from "../assets/product-7.png";

function TopSec() {
  return (
    <section className="bg-black h-screen bg-cover bg-center flex items-center justify-center" style={"background-image:url("+background+");"}>

      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl text-white mb-4 text-7xl font-extrabold leading-none md:text-6xl xl:text-7xl text-center">
            MINDANAO KING8 PLASTICS
          </h1>
          <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-xl lg:text-2xl text-center">
            Empowering Innovation, Shaping Possibilities: Discover Quality in
            Every Mould with Us!
          </p>
          <form action="#" method="POST">
            <div className="flex max-w-2xl">
              <input
                type="text"
                name="search"
                placeholder="Hunt for your perfect plastic!"
                className="bg-zinc-100 w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              <button className="flex p-2 text-black rounded-r-md bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring focus:ring-primary-light">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="ml-2">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TopSec;
