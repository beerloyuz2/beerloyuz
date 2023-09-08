"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, required, register, errors }) => {
  return (
    <div className="w-[80%]">
      <label>{label}</label>
      <input className={`peer w-full p-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`} type={type} id={id} disabled={disabled} {...register(id, { required })} placeholder=" " />
    </div>

  )
}

export default Input