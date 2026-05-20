export type Messages = {
    id? : number
    email : string
    message : string
    isRead? : boolean
    createdAt? : string
    token? : string
}

export type Mark = {
    id : number
    mark : boolean
}