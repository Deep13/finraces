import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../Components/ui/avatar"

export function AvatarDemo() {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="person" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}


export default AvatarDemo