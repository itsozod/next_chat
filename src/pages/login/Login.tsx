import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "../../shared/assets/icons/PasswordIcon";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import UserIcon from "../../shared/assets/icons/UserIcon";
import useSWRMutation from "swr/mutation";
import { IconEye } from "../../shared/assets/icons/Eye";
import { IconEyeInvisible } from "../../shared/assets/icons/EyeSlash";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { signIn } from "@/shared/api/auth/signin/signin";
import { useFormik } from "formik";
import { LoginSchema } from "@/pages/login/loginSchema";
const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const {
    data,
    isMutating,
    trigger: login,
  } = useSWRMutation("/auth/sign-in", signIn);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (data?.data?.access_token?.token) {
      tokenInstance.setToken(data?.data?.access_token?.token);
      tokenInstance.setRefreshToken(data?.data?.refresh_token?.token);
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
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-7 m-3">
                <div>
                  <Input
                    color={
                      formik.errors.username &&
                      formik.touched.username &&
                      formik.errors.username
                        ? "danger"
                        : "default"
                    }
                    startContent={<UserIcon />}
                    isClearable
                    placeholder="Enter Your Name"
                    onClear={() => formik.setFieldValue("username", "")}
                    {...formik.getFieldProps("username")}
                  />
                  <p className="text-[red]">
                    {formik.errors.username &&
                      formik.touched.username &&
                      formik.errors.username}
                  </p>
                </div>

                <div>
                  <Input
                    color={
                      formik.errors.password &&
                      formik.touched.password &&
                      formik.errors.password
                        ? "danger"
                        : "default"
                    }
                    startContent={<PasswordIcon />}
                    placeholder="Enter Your password"
                    type={isVisible ? "text" : "password"}
                    {...formik.getFieldProps("password")}
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
                  <p className="text-[red]">
                    {formik.errors.password &&
                      formik.touched.password &&
                      formik.errors.password}
                  </p>
                </div>
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
