import { fetcher } from "@/providers/swr/fetcher";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";

export const changePassword = async (url: string, { arg = {} }) => {
  const res = await fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

export const handleUpload = async (formData: FormData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/set-avatar`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenInstance.getToken()}`,
        },
        body: formData,
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
