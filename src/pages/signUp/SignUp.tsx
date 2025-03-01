import EmailIcon from "../../shared/assets/icons/EmailIcon";
import PasswordIcon from "../../shared/assets/icons/PasswordIcon";
import UserIcon from "../../shared/assets/icons/UserIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { IconEye } from "../../shared/assets/icons/Eye";
import { IconEyeInvisible } from "../../shared/assets/icons/EyeSlash";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { signUp } from "@/shared/api/auth/signup/signup";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { SignUpSchema } from "@/pages/signUp/signUpSchema";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    data,
    isMutating,
    trigger: register,
  } = useSWRMutation("/auth/sign-up", signUp);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
      fullname: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

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
                    type="text"
                    placeholder="Enter Your Name"
                    {...formik.getFieldProps("username")}
                    onClear={() => formik.setFieldValue("username", "")}
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
                      formik.errors.fullname &&
                      formik.touched.fullname &&
                      formik.errors.fullname
                        ? "danger"
                        : "default"
                    }
                    startContent={<EmailIcon />}
                    isClearable
                    placeholder="Enter Your Fullname"
                    {...formik.getFieldProps("fullname")}
                    onClear={() => formik.setFieldValue("fullname", "")}
                  />
                  <p className="text-[red]">
                    {formik.errors.fullname &&
                      formik.touched.fullname &&
                      formik.errors.fullname}
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

export default SignUp;
