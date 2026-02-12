import { useNavigate } from "react-router-dom";

interface props {
    username: string
}

export default function DashboardHeader({username}: props) {
    const navigate = useNavigate();

    async function logout() {
        //console.log("working")
        localStorage.removeItem("token")
        alert("loged out");
        navigate("/signin")
    }

    return(
        <div className="h-20 w-screen bg-gray-100 border-b border-gray-400 flex justify-between px-10 items-center sticky top-0 z-2">
            <h2 className="text-xl font-medium">PayTM App</h2>

            <div className="flex items-center gap-4">
                Hello {username}
                
                <div className="rounded-full px-5 py-3 text-2xl bg-gray-400">A</div>

                <div>
                    <i className="fa-solid fa-arrow-right-from-bracket text-2xl scale-100 hover:scale-125 transition-transform" onClick={logout}></i>
                </div>
            </div>
        </div>
    )
}