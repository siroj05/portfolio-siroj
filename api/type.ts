export type ResponseApi<T> = {
    status : string
    messages : string
    data : T
    error? : string
}