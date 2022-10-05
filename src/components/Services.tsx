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
    <div className='flex flex-row gap-3 bg-purple-100/50 my-3 md:m-5 p-2 rounded-lg'>
      <div className={`w-8 h-8 flex justify-center items-center rounded-full ${color}`}>{icon}</div>
      <div>
        <h5>{title}</h5>
        <p>Security is Guaranted. We always maintain privacy and maintain the quality of our products</p>
      </div>
    </div>
  )
}

const Services = () => {
  return (
    <div className='flex flex-col justify-center items-center px-3 md:flex-row gap-5'>
      <h1 className='center text-white md:w-2/6'>Services That we continue to improve.</h1>
      <div className=' md:w-3/6'>
        <ProvidedServices 
          title='Security Guaranteed'
          color='bg-teal-300'
          icon={<BsShieldFillCheck fontSize={20} className='text-white'/>}
          />
        <ProvidedServices 
          title='Best exchange rates'
          color='bg-red-400'
          icon={<BiSearchAlt fontSize={20} className='text-white'/>}
          />
        <ProvidedServices 
          title='Fastest transactions'
          color='bg-blue-500'
          icon={<RiHeart2Fill fontSize={20} className='text-white'/>}
          />
      </div>
    </div>
  )
}

export default Services