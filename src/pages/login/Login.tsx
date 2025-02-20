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
import toast from "react-hot-toast";
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
  } = useSWRMutation("/auth/sign-in", signIn);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      toast.error("Please enter username and password!");
      return;
    }
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
      <div className="h-[100vh]">
        <div className="flex justify-center items-center flex-col h-svh g-10">
          <div className="w-[100%] max-w-[300px] p-5 rounded-md border border-primary">
            <div className="flex items-center flex-col gap-2">
              <h1 className="fancy-text text-color text-3xl">next chat</h1>
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
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                />

                <Input
                  startContent={<PasswordIcon />}
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
                  color="primary"
                  className="text-white"
                  variant="shadow"
                  isLoading={isMutating}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1">
              <div className="text-color">Don't have an account?</div>
              <Link to={"/signup"} className="text-primary">
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
