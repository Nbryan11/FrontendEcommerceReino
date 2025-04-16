import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/bannerNaranja.jpg'
import image2 from '../assets/banner/BannerNuevo.jpg'
import image1Mobile from '../assets/banner/Banner1Mobile.png'
import image1Mobile2 from '../assets/banner/Banner2Mobile.png'

const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1, image2
    ]
    const mobileImages = [
        image1Mobile2
    ]

    const nextImage = () =>{
        if(desktopImages.length > currentImage){
            setCurrentImage(preve => preve + 1)

        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)

        }
    }

    //para hacer la transicionde imagenes cada 5 segundos
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])
    return (
        <div className='container mx-auto  rounded'>
            <div className=' h-56 md:h-72 w-full bg-white relative'>
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                    <button onClick={preveImage} className="bg-white shadow-sm rounded-full"><FaAngleLeft/></button>
                    <button onClick={nextImage} className="bg-white shadow-sm rounded-full"><FaAngleRight/></button>
                    </div>
                </div>

                {/**deskto and tablet version */}
              <div className='hidden md:flex  h-full w-full overflow-hidden '>
              {
                    desktopImages.map((imageURL, index) => {
                        return(
                        <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage*100}%)`}}>
                            <img src={imageURL} className='w-full h-full' />
                        </div>
                        )
                    })
                }
              </div>

               {/**mobile version */}
               <div className='flex h-full w-full overflow-hidden md:hidden '>
              {
                    mobileImages.map((imageURL, index) => {
                        return(
                        <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage*100}%)`}}>
                            <img src={imageURL} className='w-full h-full object-cover' />
                        </div>
                        )
                    })
                }
              </div>

            </div>
        </div>
    )
}

export default BannerProduct