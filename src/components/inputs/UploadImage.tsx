import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { type FormEvent } from "react";
// import { v2 as cloudinary } from 'cloudinary'

type IResult = {
  info: {
    path: string;
  };
};

type UploadImageProps = {
  pathImage: (result: string) => void;
  image: string | null;
};

const UploadImage = ({ pathImage, image }: UploadImageProps) => {
  const deleteImage = async () => {
    // await cloudinary.uploader.destroy(image as string).then(() => pathImage(""))
  };

  return (
    <>
      {image ? (
        <>
          <Image
            src={`https://res.cloudinary.com/dscuoxn6m/image/upload/${image}`}
            alt="Gambar"
            width={200}
            height={200}
            className="mx-auto rounded-2xl"
          />
          <span onClick={void deleteImage}>X</span>
        </>
      ) : (
        <CldUploadWidget
          uploadPreset="ml_default"
          onUpload={(result: IResult) => pathImage(result.info.path)}
        >
          {({ open }) => {
            function handleOnClick(e: FormEvent) {
              e.preventDefault();
              open();
            }
            return (
              <button className="button" onClick={handleOnClick}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
      )}
    </>
  );
};

export default UploadImage;
