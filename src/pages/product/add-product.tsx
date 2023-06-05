import { type Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "~/components/inputs/Button";
import Input, { type AllState } from "~/components/inputs/Input";
import { api } from "~/utils/api";
import UploadImage from "~/components/inputs/UploadImage";
import { useState } from "react";

const AddProduct = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const { data: sessionData } = useSession();
  const { register, handleSubmit, reset } = useForm<AllState>({
    defaultValues: {
      userId: sessionData?.user.id,
    },
  });
  const createProduct = api.product.postProduct.useMutation({
    onSuccess: async () => {
      void reset();
      await router.push("/product");
    },
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    createProduct.mutate({
      ...data,
      image,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form
        className="mt-3 flex flex-col gap-10"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <UploadImage image={image} pathImage={(result) => setImage(result)} />
        <div className="grid grid-cols-3 gap-3">
          <Input id="name" register={register} label="Product Name :" />
          <Input id="unit" register={register} label="Product Unit :" />
          <Input id="category" register={register} label="Category :" />
          <Input id="sku" register={register} label="SKU :" />
          <Input
            id="price"
            register={register}
            label="Product Price :"
            type="number"
          />
        </div>
        <Button label="Save" type="submit" size="large" className="w-min mx-auto" />
      </form>
    </div>
  );
};

export default AddProduct;
