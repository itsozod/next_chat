import EmailIcon from "../../assets/icons/EmailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { IconEye } from "../../assets/icons/Eye";
import { IconEyeInvisible } from "../../assets/icons/EyeSlash";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

type SignUpType = {
  username: string;
  email: string;
  password: string;
};
const Register = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async (url: string, { arg }: { arg: SignUpType }) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (data?.token) {
        navigate("/signin");
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const { isMutating, trigger: register } = useSWRMutation(
    "https://d00f63aca8474f91.mokky.dev/register",
    signUp
  );

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(formData);
    if (res?.statusCode === 401) {
      toast.error(res?.error);
    }
    return res;
  };
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
                  fontWeight: "bold",
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
                  isClearable={true}
                  name="username"
                  value={formData.username}
                  type="text"
                  classNames={{
                    inputWrapper: ["bg-[#292929]"],
                  }}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                />
                <Input
                  startContent={<EmailIcon />}
                  isClearable={true}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  classNames={{
                    inputWrapper: ["bg-[#292929]"],
                  }}
                  placeholder="Enter Your Email"
                />

                <Input
                  startContent={<PasswordIcon />}
                  classNames={{
                    inputWrapper: ["bg-[#292929]"],
                  }}
                  name="password"
                  value={formData.password}
                  placeholder="Enter Your password"
                  type="password"
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
                  Create Account
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1">
              <div className="text-white">Already have an account?</div>
              <Link to={"/signin"} className="text-[#D71E1E]">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
