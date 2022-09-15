import User from "../../models/User";

interface UserProp {
    currentUser: User | null;
}

export default function Restaurant({ currentUser }: UserProp) {
    console.log("Current User: ", currentUser);
    return (
        currentUser ? <h1>Logged in!</h1>
        : <h1>Not logged in!</h1>
    );
}