import { CAPTCHA_URL } from "@/lib/base-url";
import { useEffect, useState } from "react";

export function useCaptcha() {
    const [token, setToken] = useState("")
    useEffect(() => {
        const el = document.getElementById("cf-turnstile-contact");
        if ((window as any).turnstile && el && el.childNodes.length === 0) {
            (window as any).turnstile.render("#cf-turnstile-contact", {
                sitekey: CAPTCHA_URL,
                callback: setToken,
            });
        }

        return () => {
            try {
                (window as any).turnstile?.reset("#cf-turnstile-contact");
            } catch { }
        };
    }, [])

    return token
}