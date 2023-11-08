import React from "react";
import CreateProductModal from "../CreateProductModal/CreateProductModal";
import Batch from "./Batch";
import UploadQRCode from "./UploadQRCode";
import GenerateQRCode from "./GenerateQRCode";

const Products = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between p-5">
        <div className="flex items-center">
          <div className="text-3xl font-semibold font-primary text-graystrongest">
            Products
          </div>
          <div className="ml-2 text-sm font-medium opacity-50 font-primary text-graystrongest">
            (13)
          </div>
        </div>
        <CreateProductModal />
      </div>
      <div className="grid grid-cols-4 gap-4 px-4">
        <Batch />
        <Batch />
        <Batch />
        <Batch />
      </div>
      <div className="grid grid-cols-2 mx-4 mt-6 border-t border-bordergray">
        <UploadQRCode />
        <GenerateQRCode />
      </div>
    </div>
  );
};

export default Products;
