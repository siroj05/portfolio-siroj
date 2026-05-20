import { LoadingDots } from "../loading/loadings"

interface Props {
    about: string
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}
export default function AboutSection(
    {
        about,
        isLoading,
        isError,
        isSuccess
    }: Props
) {
    return (
        <section id="about">
            <div className="space-y-10">
                <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">About Me</h1>
                {
                    isLoading ?
                        <LoadingDots />
                        : isSuccess ?
                            <div className="max-w-4xl  max-[1024px]:max-w-2xl max-[691px] mx-auto">
                                <p className="text-justify max-[426px]:text-[13px]">
                                    {about}
                                </p>
                            </div> : isError && <p className="text-center">Something went wrong</p>
                }
            </div>
        </section>
    )
}