import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Search = {
  search: string;
};

const SearchForm = () => {
  const { register, handleSubmit } = useForm<Search>();

  const onSubmit: SubmitHandler<Search> = (data) => {
    console.log({ ...data });
  };

  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <input type="search" {...register("search")} className="border px-5 py-3 rounded-full focus:outline-transparent w-full"  placeholder="Search here"/>
    </form>
  );
};

export default SearchForm;
