import { useRef, useState } from "react"
import SerachUser from "../hooks/SearchUsers";
import { useNavigate } from "react-router-dom";

interface Mainprops {
    balance?: number
}

export default function Main({balance}: Mainprops) {
    const filterInputRef = useRef<any>(""); //filter value
    const [filterValue, setFilterValue] = useState(""); //filter's input value

    const navigate = useNavigate();

    const responce = SerachUser(filterValue); //fetch user usingg hook
    //console.log(responce);
    
    function filterReq() { //update new input
        setFilterValue(filterInputRef.current.value);
    }

    async function sendMoney(userId: string, username: string) { //navigate to send page
        //console.log(userId); //to

        navigate(`/send?id=${userId}&name=${username}`)

    }

    return(
        <div className="w-full h-full flex flex-col px-10">

            <div className="pt-10 font-medium text-xl flex-none">
                Your balace <span className="pl-5">RS {balance || 1}</span>
            </div>


            <div className="flex flex-col flex-1 overflow-hidden">
                {/*search users*/}
                <div className="pt-5 flex-none">
                    <h2 className="font-medium text-xl">Users</h2>
                    <input
                        type="text" 
                        className="w-full pl-2 py-2 border rounded-lg mt-2 border-gray-400" 
                        placeholder="Search users..." 
                        ref={filterInputRef} 
                        onChange={filterReq} 
                    />
                </div>

                <div className="mt-5 flex-1 overflow-y-auto px-2 pb-10">
                    { responce?.map((user: any) => (
                        <div key={user._id} className="py-5 flex justify-between">
                            <div className="flex items-center">
                                <div className="px-5.5 py-3 rounded-full bg-gray-400 text-2xl">{user.firstname[0].toUpperCase()}</div>
                                <h2 className="text-lg pl-5">{user.firstname}</h2>
                            </div>

                            <div>
                                <button className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 cursor-pointer" onClick={() => sendMoney(user._id, user.firstname)}>Send Money</button>
                            </div>
                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    )
}