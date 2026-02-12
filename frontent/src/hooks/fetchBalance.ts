import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


function FetchBalance() {
    const [balance, setBalance] = useState();
    const token = localStorage.getItem("token");

    const fetchUserBalace = async() => {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
                headers: {
                    Authorization: token,
                }
            });

            console.log(response);
            setBalance(response.data.balance)

        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserBalace();
    },[])


    return {
        balance,
    }
}

export default FetchBalance;