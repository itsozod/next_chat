import Loader from "@/shared/ui/loader/Loader";

const TopLoader = ({ isValidating }: { isValidating: boolean }) => {
  return (
    <>
      {isValidating && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default TopLoader;
