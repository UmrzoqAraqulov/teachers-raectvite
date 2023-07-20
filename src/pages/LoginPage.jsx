import { useContext, useState } from "react";
import { LoginInfo } from "../useContext/LoginContext";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(LoginInfo);
  const [login, setLogin] = useState({ username: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    if (login.username === "admin" && login.password === "12345") {
      localStorage.setItem("auth", true);
      setAuth(true);
      navigate("/");
    }
  };

  const changeInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        background:
          "url(https://www.shutterstock.com/shutterstock/videos/1059906425/thumb/1.jpg?ip=x480)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center h-screen"
    >
      <div
        style={{ width: "400px", height: "350px" }}
        className="rounded bg-gray-200 bg-opacity-50 text-center pt-10"
      >
        <h2 className="text-4xl font-semibold pb-10">LogIn</h2>
        <form onSubmit={submit} className="gap-y-4 flex flex-col">
          <div className="flex flex-col w-full items-center gap-1">
            <label
              className="w-24 font-semibold inline-block text-xl"
              htmlFor="username"
            >
              UserName:
            </label>
            <input
              name="username"
              value={login.username}
              className="py-1 px-3 outline-none rounded text-base w-72"
              onChange={changeInput}
              type="text"
              placeholder="UserName"
              min={4}
              max={12}
            />
          </div>
          <div className="flex flex-col w-full items-center gap-2">
            <label
              className="w-24 font-semibold inline-block text-xl"
              htmlFor="username"
            >
              Password:
            </label>
            <input
              name="password"
              value={login.password}
              className="py-1 px-3 outline-none rounded text-base w-72"
              onChange={changeInput}
              type="text"
              placeholder="Password"
              min={4}
              max={8}
            />
          </div>
          <button className="py-1 mx-auto px-2 bg-blue-600 rounded w-32 mt-2 text-xl">
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
