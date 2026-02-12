import axios from "axios"
import { BACKEND_URL } from "../config"

interface props {
    username: string
}

export default function DashboardHeader({username}: props) {

    async function logout() {
        //console.log("working")
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/logout`);
        console.log(res);
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