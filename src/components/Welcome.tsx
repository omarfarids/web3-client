import React , {useContext} from 'react'
import { AppContext } from './context'

type InputProps = {
  type:string,
  placeholder:string,
  name:string,
  value:string,
  onChange:(element:Element)=>{}
}

type Element = {
  target:Target
}

type Target = {
  value:string
}

function Input({type,placeholder,name,value,onChange}:InputProps){
  return <input className='rounded px-2 py-1 bg-purple-100/75 text-black' type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
}

function Welcome() {
  const {
    isSent,
    setIsSent,
    connectWallet,
    currentAccount,
    formData,
    setFormData,
    sendTransaction
  } = useContext<any>(AppContext)
  

  const handleSubmit = (e:any) => {
    const { address, amount, password, message } = formData;
    e.preventDefault();

    if(!address || !amount || !password || !message) return;
    
    sendTransaction()
  }


  return (
    <div className='px-3 py-10 text-white md:flex flex-row items-center justify-center gap-10'>
      <div className='md:w-2/6'>
        <h1 className='text-4xl font-medium'>Send Crypto across the world</h1>
        <p className='py-2 antialiased'>Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto</p>
        {currentAccount && <button onClick={connectWallet} className='bg-[#009DF1] w-96 md:w-4/6 px-7 py-1 rounded-full hover:bg-[#46b6f3]'>Connect Wallet</button>}
      </div>
      <div className='bg-purple-100/50 my-5 py-2 rounded-lg'>
        <form onSubmit={handleSubmit} action="" className=' flex flex-col md:px-3 gap-2 items-center '>
          <Input type='text' placeholder='Address To' name='address' value={formData.address} onChange={(element:Element)=>setFormData({...formData,address:element.target.value})} />
          <Input type='number' placeholder='Amount (ETH)' name='amount' value={formData.amount} onChange={(element:Element)=>setFormData({...formData,amount:element.target.value})} />
          <Input type='text' placeholder='Password' name='password' value={formData.password} onChange={(element:Element)=>setFormData({...formData,password:element.target.value})} />
          <Input type='text' placeholder='Enter Message' name='message' value={formData.message} onChange={(element:Element)=>setFormData({...formData,message:element.target.value})} />
          <hr />
          <button type='submit' onClick={()=>setIsSent(!isSent)} className='bg-[#009DF1] px-7 py-1 rounded hover:bg-[#46b6f3]'>Send</button>
          {/* {!isSent?<button type='submit' onClick={()=>setIsSent(!isSent)} className='bg-[#009DF1] px-7 py-1 rounded hover:bg-[#46b6f3]'>Send</button>:
                      <div className="spinner-container">
                        <div className="loading-spinner">
                        </div>
                      </div>} */}
        </form>
      </div>
    </div>
  )
}

export default Welcome