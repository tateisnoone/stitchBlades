import iconWhite from "@/assets/images/noresultw.png";
import iconBlack from "@/assets/images/noresultb.png";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48   w-full">
      <p className="text-lg font-body">No results found</p>
      <img src={iconBlack} className="dark:hidden size-20" />
      <img src={iconWhite} className="hidden dark:block size-20" />
    </div>
  );
};

export default NoResults;
