import React , {useContext} from 'react'
import { AppContext } from './context'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

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


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

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
    <div className='px-3 py-10 md:my-10 text-white md:flex flex-row items-center justify-center gap-10'>
      <div className='flex flex-col md:w-2/6'>
        <h1 className='font-medium center'>Send Crypto across the world</h1>
        <p className='py-2 antialiased center'>Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto</p>
        {!currentAccount && <button onClick={connectWallet} className='bg-[#009DF1]  px-7 py-1 rounded-full hover:bg-[#46b6f3]'>Connect Wallet</button>}
      
        <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
      </div>
      <div>
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {currentAccount}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>
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
    </div>
  )
}

export default Welcome