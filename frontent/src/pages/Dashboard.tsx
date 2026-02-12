import DashboardHeader from "../components/Header";
import Main from "../components/MainComponent";
import FetchBalance from "../hooks/fetchBalance";



export default function Dashboard() {
    const { balance } = FetchBalance();


    return(
        <div className="w-full h-screen bg-gray-200 flex flex-col">
            <DashboardHeader username="aman"/>

            <div className="flex flex-col flex-1 overflow-hidden">
                <Main balance={balance} />
            </div>
        </div>
    )
}
