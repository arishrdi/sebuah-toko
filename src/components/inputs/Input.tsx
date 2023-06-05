import { type Cart, type Product, type User, type Transaction } from "@prisma/client";
import { type HTMLInputTypeAttribute } from "react";
import {
  type UseFormRegister,
  type Path,
  type FieldError,
  type FieldValues,
} from "react-hook-form";

export type AllState = Product & Cart & Transaction;

type InputProps = {
  id: Path<AllState>;
  // id: string;
  label?: string;
  register: UseFormRegister<AllState>;
  // register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  errorLabel?: string;
  error?: FieldError;
};

const Input = ({
  id,
  label,
  register,
  required = false,
  type = "text",
  errorLabel,
  error,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, {
          required,
          valueAsNumber: type === "number" ? true : false,
        })}
        className={`${
          error ? "border-red-500" : ""
        } rounded-lg border-2 p-2 focus:border-emerald-500 focus:outline-none`}
      />
      {error && (
        <span className="text-sm italic text-red-500">{errorLabel}</span>
      )}
    </div>
  );
};

export default Input;
