import apiClient from "../apiClient";
import king8 from "../assets/king8-logo.png";
import { createSignal } from "solid-js";
import * as yup from "yup";
//import zxcvbn from "zxcvbn"; //for password strength checker

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "First Name needs to be at least 2 characters")
    .max(50, "First Name only allows up to 50 characters")
    .required("First Name is required")
    .trim(),
  last_name: yup
    .string()
    .min(2, "Last Name needs to be at least 2 characters")
    .max(50, "Last Name only allows up to 50 characters")
    .required("Last Name is required")
    .trim(),
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    )
    .required("Email is required"),
  mobile_number: yup
    .string()
    .nullable()
    .notRequired()
    .min(10, "Philippine Mobile Number should be 10 characters")
    .max(10, "Philippine Mobile Number should be 10 characters")
    .matches(/^9?[0-9]*$/, "Must be digits and should start with 9"),
  password: yup
    .string()
    .min(8, "Password needs to be at least 8 characters")
    .max(40, "Password should be utmost 40 characters only")
    .required("Password is required"),
});

export default function Register() {
  console.log("Hello");
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [mobileNumber, setMobileNumber] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [confirmPasswordMatch, setConfirmPasswordMatch] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const [errors, setErrors] = createSignal({});

  const handleSubmit = async (e) => {
    console.log("Reached submit function");
    e.preventDefault();
    const formData = {
      first_name: firstName(),
      last_name: lastName(),
      email: email(),
      mobile_number: mobileNumber(),
      password: password(),
    };

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({});
        console.log("Form submitted successfully:", formValues());
      })
      .catch((err) => {
        const newErrors = {};
        //console.warn(err.inner);
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });

    if (confirmPasswordMatch()) {
      console.log("Password match. Should send data to server");
      apiClient.post("hello", formData).catch((err) => {
        console.error("there is an error", err);
      });
    } else {
      console.log("Password don't match!");
    }
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
            Create an MK8P Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                for="first_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  type="text"
                  value={firstName()}
                  onInput={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors().first_name && (
                  <div className="text-center italic text-red-900">
                    {errors().first_name}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="last_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  value={lastName()}
                  onInput={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors().last_name && (
                  <div className="text-center italic text-red-900">
                    {errors().last_name}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors().email && (
                  <div className="text-center italic text-red-900">
                    {errors().email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="mobileNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-slate-500">+63</span>
                <input
                  id="mobileNumber"
                  value={mobileNumber()}
                  onInput={(e) => setMobileNumber(e.target.value)}
                  maxlength="10"
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {errors().mobile_number && (
                <div className="text-center italic text-red-900">
                  {errors().mobile_number}
                </div>
              )}
            </div>

            <div>
              <div>
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  value={password()}
                  onInput={(e) => {
                    setPassword(e.target.value);
                    setConfirmPasswordMatch(password() === confirmPassword());
                  }}
                  type={showPassword() ? "text" : "password"}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none"
                >
                  {showPassword() ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5c7 0 10 7 10 7s-3 7-10 7-10-7-10-7 3-7 10-7z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223C3.214 9.428 2 11 2 11s3 7 10 7c2.257 0 4.136-.748 5.6-1.873M9.053 9.29A3 3 0 1114.7 14.7M9.529 4.775A11.966 11.966 0 0112 4.5c7 0 10 7 10 7s-.794 1.852-2.353 3.54M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors().password && (
                <div className="text-center italic text-red-900">
                  {errors().password}
                </div>
              )}
            </div>

            <div>
              <div>
                <label
                  for="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm_password"
                  value={confirmPassword()}
                  onInput={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordMatch(password() === confirmPassword());
                  }}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {() => {
                  if (
                    confirmPasswordMatch() &&
                    confirmPassword().length !== 0 &&
                    password().length !== 0
                  ) {
                    return (
                      <div className="text-center italic text-green-900">
                        Passwords match
                      </div>
                    );
                  } else if (
                    confirmPassword().length !== 0 &&
                    password().length !== 0
                  )
                    return (
                      <div className="text-center italic text-red-900">
                        Passwords do not match
                      </div>
                    );
                }}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="default:bg-blue-950 hover:bg-blue-700 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            By clicking <span className="italic">Register</span>, you agree to
            our&nbsp;
            <a
              href="https://example.com/terms"
              target="_new"
              class="font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Terms
            </a>
            ,&nbsp;
            <a
              href="https://example.com/privacy-policy"
              target="_new"
              class="font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Privacy Policy
            </a>
            &nbsp; and&nbsp;
            <a
              href="https://example.com/cookie-policy"
              target="_new"
              class="font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Cookie Policy
            </a>
          </p>
          <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?&nbsp;
            <a
              href="/login"
              class="font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
