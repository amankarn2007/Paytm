import axios from "axios";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom"
import { BACKEND_URL } from "../config";



export default function Send() {
    const amountRef = useRef<any>(""); //sending amount

    const [searchParams] = useSearchParams(); //from url

    const toName = searchParams.get("name");
    const toId = searchParams.get("id");

    async function SendMoney() {

        const resp = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
            amount: amountRef.current.value,
            to: toId
        }, {
            headers: {
                "Authorization": localStorage.getItem("token"),
            }
        });
        //console.log(resp.data.message);
        
        alert(resp.data.message);
        amountRef.current.value = ""; //reset input
    }

    return(
        <div className="w-full h-screen bg-gray-300 flex items-center justify-center">
            <div className="h-110 w-110 rounded-lg hover:shadow-2xl shadow-cyan-300 bg-white flex flex-col items-center justify-center">
                <h1 className="font-bold text-3xl pb-10">Send Money</h1>

                <div className="flex items-center px-5">
                    <div className="px-6 py-4 rounded-full text-white text-2xl bg-green-400">{toName[0].toUpperCase()}</div>
                    <h1 className="text-2xl font-medium mr-20 ml-5"> {toName} </h1>
                </div>

                <div className="flex flex-col py-5">
                    <label className="font-medium pb-2">Amount (in Rs)</label>
                    <input type="text" placeholder="Enter amount" className="px-20 py-2 rounded-md border-2 border-gray-300" ref={amountRef}/>
                </div>

                <button className="bg-green-400 px-30 py-2.5 rounded-lg cursor-pointer text-white" onClick={SendMoney}>Initiate Transfer</button>
            </div>
        </div>
    )
}