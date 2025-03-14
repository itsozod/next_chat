import { IconEye } from "@/shared/assets/icons/Eye";
import { IconEyeInvisible } from "@/shared/assets/icons/EyeSlash";
import PasswordIcon from "@/shared/assets/icons/PasswordIcon";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { changePassword, handleUpload } from "@/shared/api/password/password";
import { profileFetcher } from "@/app/providers/swr/profileFetcher";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: avatar, mutate } = useSWR("/user/get-avatar", profileFetcher);
  const { isMutating, trigger: change } = useSWRMutation(
    "/auth/change-password",
    changePassword
  );
  const { trigger: uploadAvatar } = useSWRMutation(
    "/user/set-avatar",
    handleUpload
  );
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await change(formData);
  };

  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.", {
          position: "top-right",
          duration: 3000,
        });
        return;
      }
      const formData = new FormData();
      formData.append("avatar", file as File);
      await uploadAvatar(formData);
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
              className="w-[50px] h-[50px] rounded-[50%]"
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
