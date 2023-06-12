"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };

  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords Do Not Match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.firstName === data.lastName, {
      message: "Names Do Not Match",
      path: ["firstName"],
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("hello");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className="flex flex-col">
      <div className="w-1/4 flex justify-between">
        <label> First Name: </label>
        <input type="text" {...register("firstName")} className="border-2" />
      </div>
      {errors.firstName && (
        <span className="text-red-500"> {errors.firstName.message}</span>
      )}

      <div className="w-1/4 flex justify-between">
        <label> Last Name: </label>
        <input type="text" {...register("lastName")} className="border-2" />
      </div>
      {errors.lastName && (
        <span className="text-red-500"> {errors.lastName.message}</span>
      )}
      <div className="w-1/4 flex justify-between">
        <label> Email: </label>
        <input type="email" {...register("email")} className="border-2" />
      </div>
      {errors.email && (
        <span className="text-red-500"> {errors.email.message}</span>
      )}

      <div className="w-1/4 flex justify-between">
        <label> Age </label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="border-2"
        />
      </div>
      {errors.age && (
        <span className="text-red-500"> {errors.age.message}</span>
      )}

      <div className="w-1/4 flex justify-between">
        <label> Password: </label>
        <input type="password" {...register("password")} className="border-2" />
      </div>
      {errors.password && (
        <span className="text-red-500"> {errors.password.message}</span>
      )}

      <div className="w-1/4 flex justify-between">
        <label> Confirm Password: </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="border-2"
        />
      </div>
      {errors.confirmPassword && (
        <span className="text-red-500"> {errors.confirmPassword.message}</span>
      )}

      <input type="submit" className="w-1/4 border-2" />
    </form>
  );
};

export default Form;
