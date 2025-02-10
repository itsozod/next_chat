import { IconEye } from "@/assets/icons/Eye";
import { IconEyeInvisible } from "@/assets/icons/EyeSlash";
import PasswordIcon from "@/assets/icons/PasswordIcon";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { Avatar } from "@heroui/avatar";
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

      return data;
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

  const handleUpload = async (formData: FormData) => {
    try {
      const res = await fetch("http://5.253.62.94:8084/user/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenInstance.getToken()}`,
        },
        body: formData,
      });
      const data = await res.json();
      console.log("pass", data);

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files && e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file as File);
      await handleUpload(formData);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  return (
    <div>
      <div className="flex p-3 justify-center items-center flex-col h-svh g-10">
        <div className="w-[100%] max-w-[600px] p-5 rounded-md border border-red-500 flex flex-col gap-5">
          <h1 className="text-white text-[1.3rem]">Profile picture</h1>
          <div className="w-full flex justify-between items-center">
            <Avatar />
            <label className="bg-[#F7F7F7] p-2 rounded-md cursor-pointer">
              Choose picture
              <input
                type="file"
                className="hidden"
                onChange={handleChangeImg}
              />
            </label>
          </div>
          <div>
            <h1 className="text-white text-[1.3rem]">Password</h1>
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
    </div>
  );
};

export default Profile;
