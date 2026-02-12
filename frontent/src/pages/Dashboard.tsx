import DashboardHeader from "../components/Header";
import FetchBalance from "../hooks/fetchBalance";



export default function Dashboard() {
    FetchBalance();


    return(
        <div className="w-full h-screen bg-gray-200 flex flex-col">
            <DashboardHeader username="aman"/>

            <Main balance={166} />
        </div>
    )
}

interface Mainprops {
    balance: number
}

function Main({balance}: Mainprops) {
    return(
        <div className="w-full flex flex-col grow px-10">

            <div className="pt-10 font-medium text-xl">
                Your balace <span className="pl-5">RS {balance}</span>
            </div>


            <div>
                <div className="pt-5">
                    <h2 className="font-medium text-xl">Users</h2>
                    <input type="text" className="pr-315 pl-2 py-2 border rounded-lg mt-2 border-gray-400" placeholder="Search users..." />
                </div>

                <div className="py-5 flex justify-between">
                    <div className="flex items-center">
                        <div className="px-5 py-3 rounded-full bg-gray-400 text-2xl">H</div>
                        <h2 className="text-lg pl-2">Harkirat Singh</h2>
                    </div>

                    <div>
                    <button className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800">Send Money</button>
                    </div>
                </div>
            </div>
        </div>
    )
}