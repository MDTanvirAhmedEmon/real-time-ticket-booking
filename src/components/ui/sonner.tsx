"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      className="bg-white text-black text-lg"
      {...props}
    />
  )
}

export { Toaster }
