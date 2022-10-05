import React , {useContext} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AppContext } from './context';


function Navbar() {
  const {
    isTuggle,
    setIsTuggle
  } = useContext<any>(AppContext)


  return (
    <div className='flex justify-between px-3 py-3'>
      <h1 className='text-2xl font-bold text-white'>Krypto</h1>
      <div className='flex justify-between gap-5'>
        <div className='relative'>
          <button onClick={()=>setIsTuggle(!isTuggle)} className='text-white mt-2 cursor-pointer sm:hidden'><GiHamburgerMenu /></button>
          <ul className={`${isTuggle?'flex':'hidden'} w-32 flex-col absolute right-1 top-6 rounded justify-between gap-3 bg-purple-100/50 py-2 items-center text-white`}>
          {['Market','Exchange','Tutorials','Wallets'].map((element,index)=>{
            return <li key={index} className='w-32 cursor-pointer text-center text-black hover:bg-purple-100/75'>{element}</li>
          })}
        </ul>
        </div>
        <ul className='sm:flex justify-between gap-3 items-center hidden md:text-white'>
          {['Market','Exchange','Tutorials','Wallets'].map((element,index)=>{
            return <li key={index} className='cursor-pointer'>{element}</li>
          })}
        </ul>
        <button className='bg-[#009DF1] px-3 rounded-full text-white border-0 hover:bg-[#46b6f3]'>Login</button>
      </div>
    </div>
  )
}

export default Navbar