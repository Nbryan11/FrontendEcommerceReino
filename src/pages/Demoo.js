import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'


const Demoo = () => {
    const [data, setData] = useState(null)

    const fetchData  = async() =>{     
        try{
            const dataResponse = await fetch(SummaryApi.demo.url)
            const result = await dataResponse.json()
            setData(result.data)
            console.log(data)
        }catch(error){
            console.log("error", error)
        }   
       
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        {data}
    </div>
  )
  
}

export default Demoo