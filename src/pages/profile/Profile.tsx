import { IconEye } from "@/shared/assets/icons/Eye";
import { IconEyeInvisible } from "@/shared/assets/icons/EyeSlash";
import PasswordIcon from "@/shared/assets/icons/PasswordIcon";
import { profileFetcher } from "@/providers/swr/fetcher";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const Profile = () => {
  const { data: avatar, mutate } = useSWR("/user/get-avatar", profileFetcher);
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

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const { isMutating, trigger: change } = useSWRMutation(
    "/auth/change-password",
    changePassword
  );

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await change(formData);
  };

  const handleUpload = async (formData: FormData) => {
    try {
      const res = await fetch("http://5.253.62.94:8084/user/set-avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenInstance.getToken()}`,
        },
        body: formData,
      });
      const data = await res.json();
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
      await mutate();
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  return (
    <div className="w-full flex p-3 flex-col items-center h-svh g-10">
      <div className="w-[100%] max-w-[600px] p-5 rounded-md border border-primary flex flex-col gap-5">
        <h1 className="text-color text-[1.3rem]">Profile picture</h1>
        <div className="flex justify-between items-center">
          {avatar ? (
            <img
              className="rounded-[50%]"
              width={50}
              height={50}
              src={avatar}
            ></img>
          ) : (
            <Avatar src={avatar} />
          )}
          <label className="bg-primary p-2 rounded-md cursor-pointer text-white">
            Choose picture
            <input
              type="file"
              className="hidden"
              onChange={handleChangeImg}
              accept=".jpg, .jpeg, .png"
            />
          </label>
        </div>
        <div>
          <h1 className="text-color text-[1.3rem]">Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10 m-3">
              <Input
                startContent={<PasswordIcon />}
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
                className="text-white"
                color="primary"
                variant="shadow"
                isLoading={isMutating}
                type="submit"
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
