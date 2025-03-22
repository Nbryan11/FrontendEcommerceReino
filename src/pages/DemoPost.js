import React, { useEffect } from 'react'
import SummaryApi from '../common'

const DemoPost = () => {

const sendData = async() =>{
    try{
        const response = await fetch(SummaryApi.demoPost.url,{
            method: SummaryApi.demoPost.method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                success: true,
                data: "mensaje enviado desde frontend"
            })

        })
        const result = await response.json();
        console.log(result)

    }catch(error){
        console.log("error")
    }
}

    useEffect(()=>{
        sendData()
    },[])

  return (
    <div>DemoPost</div>
  )
}


export default DemoPost