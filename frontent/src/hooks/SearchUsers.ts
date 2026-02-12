import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export default function SerachUser(filterValue: string) {
    const [users, setUsers] = useState<any[]>([]);

    async function search() {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filterValue}`)
            //console.log(response.data.user);

            setUsers(response.data.user)
    
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        search();
    }, [filterValue])

    return users;
}