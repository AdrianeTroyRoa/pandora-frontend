import { createSignal } from "solid-js";
import king8 from "../assets/king8-logo.png";
//import { createSignal } from "solid-js";
//import { useNavigate } from "@solidjs/router";
//import { Toaster, toast } from "solid-toast";

export default function Login() {
  const [showPassword, setShowPassword] = createSignal(false);

  const togglePassword = () => {
    setShowPassword(!showPassword());
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/">
            <img
              className="mx-auto h-20 w-auto"
              src={king8}
              alt="Mindanao King 8 Plastic"
            />
          </a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-950 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type={showPassword() ? "text" : "password"}
                  autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <div class="flex gap-2 mt-2">
                  <input
                    id="showPassword"
                    type="checkbox"
                    checked={showPassword()}
                    onchange={togglePassword}
                    class="text-blue-950"
                  />
                  Show Password
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md default:bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not yet registered?&nbsp;
            <a
              href="/sign-up"
              className="font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
