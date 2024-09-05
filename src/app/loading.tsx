
"use client";
import { tailspin } from 'ldrs'

tailspin.register()

export default function Loader() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="grid place-items-center">
          <l-tailspin
            size="150"
            stroke="5"
            speed="0.9" 
            color="rgb(147 51 234)" 
          ></l-tailspin>
        </div>
      </div>
    </section>
  )
}

