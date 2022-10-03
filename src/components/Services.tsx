import React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

type ServicesProps = {
  title:string,
  color:string,
  icon:any
}


const ProvidedServices = ({title,color,icon}:ServicesProps) => {
  return (
    <div className='flex flex-row gap-3 bg-purple-100/50 my-5 py-2 rounded-lg'>
      <div className={`w-8 h-8 flex justify-center items-center rounded-full ${color}`}>{icon}</div>
      <div>
        <h2>{title}</h2>
        <p>Security is Guaranted. We always maintain privacy and maintain the quality of our products</p>
      </div>
    </div>
  )
}

const Services = () => {
  return (
    <div>
      <h1>Services That we continue to improve.</h1>
      <div>
        <ProvidedServices 
          title='Security Guaranteed'
          color='bg-teal-300'
          icon={<BsShieldFillCheck fontSize={20} className='text-white'/>}
          />
      </div>
    </div>
  )
}

export default Services