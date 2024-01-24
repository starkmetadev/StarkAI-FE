import React, { RefObject } from "react";
import { Icon } from "@iconify/react";

interface ImageGuidanceProps {
  imageSrc: File | null;
  uploadImgRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveUpload: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleUpload: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ImageGuidance: React.FC<ImageGuidanceProps> = ({
  imageSrc,
  uploadImgRef,
  handleFileChange,
  handleRemoveUpload,
  handleUpload,
}) => {
  return (
    <div className="py-5 px-8 font-chakra">
      <div className="flex flex-col w-full bg-[#0b0f17] rounded-md">
        <div className="flex flex-row w-full justify-between items-center px-5 py-3">
          <span className="flex flex-row gap-5 items-center">
            <span className="rounded-md bg-[#181F2F] p-2 text-[12px] w-5 h-5 flex items-center">
              1
            </span>
            <h2 className="">Image Input</h2>
          </span>
        </div>
        <div className="flex flex-col flex-1 py-[10px] px-5 gap-[6px]">
          <span className="flex flex-row gap-1 items-center">
            <span className="text-[14px]">Add an image to get started</span>
            <Icon icon="ph:question-fill" className="w-4 h-4 text-white/30" />
          </span>
          <div className="py-2 flex flex-row items-center justify-center">
            <div
              onClick={handleUpload}
              className={`relative ${
                imageSrc ? "w-2/3" : "w-full"
              } h-[300px] rounded-md bg-[#101622] border border-dashed border-white border-opacity-20 hover:cursor-pointer`}
            >
              <input
                type="file"
                ref={uploadImgRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="flex justify-center items-center w-full h-full">
                {imageSrc && (
                  <img
                    src={URL.createObjectURL(imageSrc)}
                    alt="Uploaded Avatar"
                    className="w-auto h-full object-cover"
                    // Handle onLoad directly here to avoid creating an object URL twice
                    onLoad={(event) => {
                      const target = event.target as HTMLImageElement;
                      URL.revokeObjectURL(target.src); // Revoke the object URL to avoid memory leaks
                    }}
                  />
                )}
                {!imageSrc && (
                  <Icon
                    icon="mingcute:user-4-fill"
                    className="w-8 h-8 text-white"
                  />
                )}
              </div>
            </div>
            {imageSrc && (
              <div className="w-1/3 px-5 py-3">
                <div className="flex flex-col items-center justify-center gap-5">
                  <div
                    className="group rounded-md border-primary border p-5 w-full flex flex-row items-center gap-5 justify-center hover:cursor-pointer hover:bg-[#393b45]"
                    onClick={handleRemoveUpload}
                  >
                    <Icon
                      icon="streamline:recycle-bin-2-solid"
                      className="w-6 h-6"
                    />
                    <span className="text-[18px] font-semibold select-none">
                      Remove Image
                    </span>
                  </div>
                  <div
                    className="group rounded-md border-primary border p-5 w-full flex flex-row items-center gap-5 justify-center hover:cursor-pointer hover:bg-[#393b45]"
                    onClick={handleUpload}
                  >
                    <Icon icon="entypo:upload" className="w-6 h-6" />
                    <span className="text-[18px] font-semibold select-none">
                      Upload Image
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ImageGuidance;