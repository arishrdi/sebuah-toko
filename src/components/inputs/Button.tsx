import { type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  roundedFull?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost";
  onCLick?: () => void;
  className?: string;
  label: string
};

const Button = ({
  type = "button",
  roundedFull = false,
  size = "medium",
  variant = "primary",
  className = "",
  label,
  onCLick,
}: ButtonProps) => {
  return (
    <button
      onClick={onCLick}
      type={type}
      className={`transition-all duration-300 ease-in-out
        ${roundedFull ? "rounded-full" : "rounded-lg"}
        ${size === "small" ? "px-3 py-1 text-base" : ""}
        ${size === "medium" ? "px-5 py-2 text-lg font-bold" : ""}
        ${size === "large" ? "px-7 py-3 text-2xl font-bold" : ""}
        ${className}
        ${
          variant === "primary"
            ? "bg-slate-500 text-white hover:bg-slate-700"
            : ""
        }
        ${
          variant === "secondary"
            ? "bg-slate-200 text-slate-500 hover:bg-slate-500 hover:text-white"
            : ""
        }
        ${
          variant === "ghost"
            ? "border-2 border-slate-500 text-slate-500  hover:bg-slate-500 hover:text-white"
            : ""
        }
    `}
    >{label}</button>
  );
};

export default Button;
