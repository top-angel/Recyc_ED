import React from "react";
import ImageUploader from "../CreateProductModal/ImageUploader";

const UploadQRCode = () => {
  return (
    <div className="px-3 mt-4 border-r border-bordergray">
      <div className="font-bold text-center font-primary">
        Upload QR Code Batches
        <span className="text-sm font-medium font-primary text-darkgray">
          (1000)
        </span>
      </div>
      <div className="mt-2 text-base font-medium text-center font-primary text-darkgray">
        Select a Product to Upload QR Codes
      </div>
      <div className="mt-5">
        <label className="text-sm text-darkgray">Batch Name</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 mt-1 text-base border rounded-lg border-bordergray"
          placeholder="Batch1"
        />
      </div>
      <ImageUploader
        className="h-[126px] mt-4"
        onImageUpload={(imageFile: File) => console.log(imageFile)}
      />
    </div>
  );
};

export default UploadQRCode;
