import toast from "react-hot-toast";

export const fetcherErrorHandler = async (response: Response) => {
  const errorData = await response.json();
  toast.error(`${errorData?.error || response.statusText}`, {
    position: "top-right",
    duration: 3000,
  });
};
