import React from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const Batch = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm border-bordergray">
      <div className="flex items-center gap-4">
        <img
          src={"/assets/images/coca-cola.svg"}
          className="w-12 p-2 border rounded-lg border-bordergray"
        />
        <div className="text-sm text-textDarkBlue">2.5L Bottles</div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="inline-flex items-center px-2 py-1 rounded-lg bg-gray">
          <MdOutlineQrCodeScanner className="w-5 h-5 text-blue-400" />
          <div className="text-sm text-blue-400">100</div>
        </div>
        <button className="w-full py-1 text-sm font-semibold text-center text-blue-400 border border-blue-300 rounded-lg font-primary">
          View Batches
        </button>
      </div>
    </div>
  );
};

export default Batch;
