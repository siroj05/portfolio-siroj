"use client"
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import FormContact from "../form/form-contact";
import { ProfileModel } from "@/api/profile";
import { LoadingDots } from "../loading/loadings";

interface Props {
  data: ProfileModel
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export default function ContactSection({
  data,
  isLoading,
  isSuccess,
  isError
}: Props) {

  return (
    <section id="#contact" className="space-y-10">
      <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Contact Me</h1>
      {
        isLoading ?
          <div className="w-full mx-auto">
            <LoadingDots />
          </div> :
          isSuccess ?
            <div className="flex max-w-4xl max-sm:flex-col justify-between mx-auto gap-5">
              {/* contact */}
              <div className="space-y-10 w-full">
                <div className="flex flex-col justify-center gap-3">
                  <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                    <Mail className="my-auto w-12 h-12" />
                    <div className="">
                      <p className="font-semibold">Email</p>
                      <p className="text-sm dark:text-slate-200">
                        {data.email}
                      </p>
                    </div>
                  </div>
                  <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                    <MapPin className="my-auto w-12 h-12" />
                    <div className="">
                      <p className="font-semibold">Location</p>
                      <p className="text-sm dark:text-slate-200">
                        {data.location}
                      </p>
                    </div>
                  </div>
                  <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                    <Phone className="my-auto w-12 h-12" />
                    <div className="">
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm dark:text-slate-200">
                        {data.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* form contact */}
              <FormContact />
            </div> : isError && <p className="text-center">Something went wrong</p>
      }
    </section>
  )
}