import logo1 from '../assets/mantenimientoPreventivo.png'
import logo2 from '../assets/mantenimientoCorrectivo.png'
import logo3 from '../assets/serviciosSoftware.png'

import React from 'react'
import { Link } from 'react-router-dom'

const serviceForm = () => {
  return (
    <div className=''>
      <h2>Elija el tipo de servicio que quiere solicitar</h2>
      <div className='flex items-center p-4 justify-around'>
        <Link to={"/mantenimiento-preventivo"}>
          <img className="w-44" src={logo1} />
        </Link>

        <Link to={"/mantenimiento-correctivo"}>
          <img className="w-44" src={logo2} />
        </Link>

        <Link>
          <img className="w-44" src={logo3} />
        </Link>

      </div>
    </div>
  )
}

export default serviceForm