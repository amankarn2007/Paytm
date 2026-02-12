import axios from "axios";
import type React from "react"
import { useRef } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export default function Signin() {
    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const navigate = useNavigate();

    async function sendReq() {
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        //console.log(data);

        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, data);
        //console.log(response);

        alert(response.data.message);
        

        if(response.data.token){
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard")
        }
    }

    return(
        <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
            <div className="h-150 w-110 bg-white rounded-xl flex flex-col items-center">

                <div className="flex flex-col items-center gap-2 mt-15">
                    <h1 className="text-4xl font-semibold">Sign in</h1>
                    <p className="text-lg">Enter your information to login your account</p>
                </div>

                <div className="pt-5">
                    <LabeldInput label="Username" placeholder="amankarn@gmail.com" ref={usernameRef}/>
                    <LabeldInput label="Password" type="password" ref={passwordRef}/>
                    <a href="/changePass" className="hover:underline">forget password ?</a>
                </div>

                <button className="px-39 py-2 rounded-lg mt-8 bg-black text-white cursor-pointer hover:bg-gray-800" onClick={sendReq}>Signin</button>

                <p className="py-4">Don't have an account? <a href="/signup" className="underline">Signup</a></p>

            </div>
        </div>
    )
}

interface props {
    label: string
    placeholder?: string,
    type?: string,
    ref: React.RefObject<HTMLInputElement>,
}

function LabeldInput({label, placeholder, type, ref}: props) {
    return(
        <div className="flex flex-col pt-5">
            <label className=""> {label} </label>

            <input type={type || "text"} placeholder={placeholder} ref={ref} className="pr-38 pl-2 py-2 border border-gray-400 rounded-lg"/>
        </div>
    )
}