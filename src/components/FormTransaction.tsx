import React from "react";
import Input, { type AllState } from "./inputs/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Transaction } from "@prisma/client";

const FormTransaction = () => {
  const { register, handleSubmit } = useForm<AllState>();

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    console.log("Transaction => ", { ...data });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Recepient Name" id="recepient" register={register} />
    </form>
  );
};

export default FormTransaction;
