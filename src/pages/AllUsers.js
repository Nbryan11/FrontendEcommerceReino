import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    
    email : "",
    name : "",
    role : "",  
    _id :""
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })


    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }

  useEffect(()=>{
    fetchAllUsers()
  },[])
  return (
    <div className='pb-4 bg-white'>
      <table className='w-full userTable'>
        <thead>
         <tr className='bg-black text-white'>
         <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created date</th>
          <th>action</th>
         </tr>

        </thead>
        <tbody>
          {
            allUser.map((el, index) =>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LLL')}</td>
                  <td><button className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white' 
                  onClick={()=>{
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)

                  }}>
                  
                  <MdModeEdit/></button></td>
                </tr>
              )

              

            })
          }
        </tbody>
      </table>

      {
        //mostramos la ventana ChangeUserRole segun el valor false o true, y onClose esta definido en ChangeUserRole
        //tambien pasamos a la vista <ChangeUserRole/> los valores de onClose que cierra la ventana en ChangeUserRole y las variables 
        openUpdateRole &&(
          <ChangeUserRole 
          onClose={()=>setOpenUpdateRole(false)}  
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}

          />
        )
      }
    </div>
  )
}

export default AllUsers