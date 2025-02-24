import EmailIcon from "../../shared/assets/icons/EmailIcon";
import PasswordIcon from "../../shared/assets/icons/PasswordIcon";
import UserIcon from "../../shared/assets/icons/UserIcon";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { IconEye } from "../../shared/assets/icons/Eye";
import { IconEyeInvisible } from "../../shared/assets/icons/EyeSlash";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { signUp } from "@/shared/api/auth/signup/signup";
import toast from "react-hot-toast";

const Register = () => {
  const {
    data,
    isMutating,
    trigger: register,
  } = useSWRMutation("/auth/sign-up", signUp);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.username.trim() === "" ||
      formData.password.trim() === "" ||
      formData.fullname.trim() === ""
    ) {
      toast.error("Please fill all the fields!");
      return;
    }
    await register(formData);
  };

  useEffect(() => {
    if (data) {
      toast.success("User is created successfully!");
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
                  isClearable={true}
                  name="username"
                  value={formData.username}
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                />
                <Input
                  startContent={<EmailIcon />}
                  isClearable={true}
                  name="fullname"
                  onChange={handleChange}
                  value={formData.fullname}
                  placeholder="Enter Your Fullname"
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
                  className="text-white"
                  color="primary"
                  variant="shadow"
                  isLoading={isMutating}
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-1">
              <div className="text-color">Already have an account?</div>
              <Link to={"/signin"} className="text-primary">
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
