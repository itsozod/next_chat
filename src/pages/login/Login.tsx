import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ChangeEvent, useEffect, useState } from "react";
import UserIcon from "../../assets/icons/UserIcon";
import useSWRMutation from "swr/mutation";
import { IconEye } from "../../assets/icons/Eye";
import { IconEyeInvisible } from "../../assets/icons/EyeSlash";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { signIn } from "@/shared/api/auth/signin/signin";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const {
    data,
    isMutating,
    trigger: login,
  } = useSWRMutation("http://5.253.62.94:8084/auth/sign-in", signIn);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  useEffect(() => {
    if (data?.data?.access_token?.token) {
      tokenInstance.setToken(data?.data?.access_token?.token);
      navigate("/");
    }
  }, [data]);

  return (
    <>
      <div className="bg-[#202020] h-[100vh]">
        <div className="flex justify-center items-center flex-col h-svh g-10">
          <div className="w-[100%] max-w-[300px] p-5 rounded-md border border-red-500">
            <div className="flex items-center flex-col gap-2">
              <h1
                style={{
                  fontFamily: "Playwrite IE, cursive",
                  fontOpticalSizing: "auto",
                  fontWeight: "bolder",
                  fontStyle: "normal",
                }}
                className="text-[#f4f4f4] text-3xl"
              >
                next chat
              </h1>
              <p className="text-[#7B7B7B]">Please Sign In to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-10 m-3">
                <Input
                  startContent={<UserIcon />}
                  isClearable
                  onClear={() => setFormData({ ...formData, username: "" })}
                  name="username"
                  value={formData.username}
                  classNames={{
                    inputWrapper: ["bg-[#292929]"],
                  }}
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                />

                <Input
                  startContent={<PasswordIcon />}
                  classNames={{
                    inputWrapper: ["bg-[#292929]"],
                  }}
                  name="password"
                  value={formData.password}
                  placeholder="Enter Your password"
                  type={isVisible ? "text" : "password"}
                  onChange={handleChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? <IconEye /> : <IconEyeInvisible />}
                    </button>
                  }
                />
                <Button
                  isLoading={isMutating}
                  type="submit"
                  className="bg-[red] text-[white]"
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1">
              <div className="text-white">Don't have an account?</div>
              <Link to={"/signup"} className="text-[#D71E1E]">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
