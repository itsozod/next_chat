import { IconEye } from "@/assets/icons/Eye";
import { IconEyeInvisible } from "@/assets/icons/EyeSlash";
import PasswordIcon from "@/assets/icons/PasswordIcon";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import useSWRMutation from "swr/mutation";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  const changePassword = async (
    url: string,
    { arg }: { arg: { old_password: string; new_password: string } }
  ) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenInstance.getToken()}`,
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      console.log("pass", data);

      // return data;
    } catch (e) {
      console.log(e);
    }
  };

  const { isMutating, trigger: change } = useSWRMutation(
    "http://5.253.62.94:8084/auth/change-password",
    changePassword
  );

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await change(formData);
  };

  return (
    <div>
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
              Change Password
            </h1>
            <p className="text-[#7B7B7B]">Please Sign In to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10 m-3">
              <Input
                startContent={<PasswordIcon />}
                classNames={{
                  inputWrapper: ["bg-[#292929]"],
                }}
                name="old_password"
                value={formData.old_password}
                placeholder="Enter your old password"
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
              <Input
                startContent={<PasswordIcon />}
                classNames={{
                  inputWrapper: ["bg-[#292929]"],
                }}
                name="new_password"
                value={formData.new_password}
                placeholder="Enter your new password"
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
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
