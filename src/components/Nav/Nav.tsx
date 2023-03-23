import { Dispatch, SetStateAction } from "react";

interface Props {
  showTrashcan: boolean;
  setShowTrashcan: Dispatch<SetStateAction<boolean>>;
}

export default function Nav(props: Props) {
  const { showTrashcan, setShowTrashcan } = props;
  return (
    <>
      <div className="fixed bottom-10 z-20 left-0 right-0 flex justify-center">
        {showTrashcan && (
          <div className="text-white bg-purple w-16 h-16 rounded-full flex justify-center items-center drop-shadow-2xl trashcan">
            T
          </div>
        )}
        {!showTrashcan && (
          <div className="text-3xl text-white bg-purple w-16 h-16 rounded-full flex justify-center items-center drop-shadow-2xl">
            +
          </div>
        )}
      </div>
    </>
  );
}
