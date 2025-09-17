import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthLogout, GetMe } from "./auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ResponseApi } from "../type";
import { GetMeModel } from "./type";

export function useLogout () {
    const router = useRouter()
    return useMutation({
        mutationFn : AuthLogout,
        onSuccess : () => {
            // harusnya muncul saat logout berhasil
            toast.success("Log out success!")
            router.push("/login")
        },
        onError:(err) => {
            toast.error(`Log out failed : ${err.message}`)
        }
    })
}

export function useGetMe () {
    return useQuery<ResponseApi<GetMeModel>>({
        queryKey : ["user"],
        queryFn : GetMe
    })
}