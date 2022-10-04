import LoginPage from "../../components/login/Login";
import Register from "../../components/login/Register";

export default function LoginHomePage() {
    return (
        <div className="">
            <h1 className="text-center font-medium text-5xl m-20">"Login"</h1>
            <div className="lg:flex justify-center gap-56">
                <div className="lg:flex gap-48">
                    <LoginPage />
                    <Register />
                </div>
                <img className="p-10 rounded-md shadow-xl" src="https://i.insider.com/5ebb110842278d26613a7b57?width=750&format=jpeg&auto=webp" alt="" />
            </div>
        </div>
    );
}