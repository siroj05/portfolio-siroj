import { useMutation } from "@tanstack/react-query";
import { AuthLogout } from "./auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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