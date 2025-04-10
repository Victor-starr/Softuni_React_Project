import { Link } from "react-router";
import useAuthAPI from "../../hooks/useAuthAPI";
export default function Login() {
  const { formData, handleInput, handleLogin } = useAuthAPI();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md text-black dark:text-white">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password:<i className="text-red-500">*</i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Repeat Password:<i className="text-red-500">*</i>
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formData.rePassword || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            Log In
          </button>
          <Link
            to="/auth/register"
            className="block mt-4 text-sm text-center text-indigo-600 hover:underline dark:text-indigo-400"
          >
            If you don't already have an account
          </Link>
        </form>
      </div>
    </div>
  );
}
