import axios from "axios"
import { useRef } from "react";
import {BACKEND_URL} from "../config"
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const firstnameRef = useRef<any>("");
    const lastnameRef = useRef<any>("");
    const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");

    const navigate = useNavigate();


    async function sendReq() {
        const data = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        //console.log(data);

        const responce = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data);
        //console.log(responce);

        const jwt = responce.data.token;
        localStorage.setItem("token", jwt); //token seted in header

        alert(`${responce.data.message}`);
        navigate("/signin");
    }

    return(
        <div className="w-full h-screen bg-gray-700 flex justify-center items-center">
            <div className="h-160 w-110 bg-white rounded-xl flex items-center flex-col px-2">

                <div className="flex flex-col items-center gap-2 mt-8">
                    <h1 className="text-4xl font-semibold">Sign up</h1>
                    <p className="text-lg">Enter your information to create an account</p>
                </div>

                <div className="py-2">
                    <LabeldInput label="First Name" placeholder="John" ref={firstnameRef}/>
                    <LabeldInput label="Last Name" placeholder="Cena" ref={lastnameRef}/>
                    <LabeldInput label="Username" placeholder="amankarn@gmail.com" ref={usernameRef}/>
                    <LabeldInput label="Password" type="password" ref={passwordRef}/>
                </div>

                <button className="px-39 py-2 rounded-lg mt-8 bg-black text-white cursor-pointer hover:bg-gray-800" onClick={sendReq}>Signup</button>

                <p className="py-4">Already have an account? <a href="/signin" className="underline">Login</a></p>
            </div>
        </div>
    )
}

interface props {
    label: string;
    placeholder?: string;
    type?: string;
    ref: React.RefObject<HTMLInputElement>;
}

function LabeldInput({label, placeholder, type, ref}: props) {
    return(
        <div className="mt-5 flex flex-col">
            <label className="font-medium"> {label} </label>

            <input type={type || "text"} placeholder={placeholder} className="pr-40 pl-5 py-2 border border-gray-400 rounded-lg " ref={ref} />
        </div>
    )
}