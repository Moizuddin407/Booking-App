import { useState, useEffect } from "react";  // Import useState and useEffect from React
import axios from "axios";  // Import axios

const useFetch = (url) =>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)        

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const res = await axios.get(url)
                setData(res.data);
            }catch(e){
                setError(e);
            }
            setLoading(false);
        }
        fetchData();
    },[url]);
    // You can add url in [] above to update
    const reFetchData = async ()=>{
        setLoading(true);
        try{
            const res = await axios.get(url)
            setData(res.data);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    };

    return {data,loading,error,reFetchData}
};
export default useFetch;