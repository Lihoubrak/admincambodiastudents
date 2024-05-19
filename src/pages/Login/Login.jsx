import React, { useEffect, useState } from "react";
import { publicRequest } from "../../RequestMethod/Request";
import Cookies from "js-cookie";
import { NineCellLoading } from "react-loadingg";
import { ModalResetPassword } from "../../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await publicRequest.post("/users/v1/login", {
        username,
        password,
      });
      if (res.status === 200) {
        Cookies.set("tokenJwt", res.data);
        window.location.href = "/";
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="relative h-screen">
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 bg-opacity-70 z-50">
            <NineCellLoading color="#3b82f6" />
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
            <form onSubmit={handleSubmit} className="mt-2 w-full">
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary focus:ring-primary"
                  required
                  minLength={6}
                />
              </div>
              <button className="mb-2 flex items-center">
                <p className="text-sm text-gray-700 hover:text-gray-900 focus:text-gray-900 transition-colors duration-300">
                  Forgot password?
                </p>
              </button>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Login
                </button>
                <p className="mt-2 text-sm font-semibold">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="text-[#dd546b] hover:text-gray-800 focus:text-gray-800 active:text-gray-900"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
