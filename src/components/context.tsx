import React ,{ createContext , useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { contractABI , contractAddress } from '../utils/constants';


declare global {
  interface Window{
    ethereum?:any
  }
}


type ContextProps = {
    isSent:boolean,
    currentAccount:string,
    isTuggle:boolean,
    formData:FormData,
    setFormData:(data:FormData)=>void,
    setIsSent:(arg:boolean)=>void,
    setIsTuggle:(arg:boolean)=>void,
    connectWallet:()=>void,
    sendTransaction:()=>any,
}

type FormData = {
    address:string,
    amount:string,
    password:string,
    message:string
}

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract;
}



const AppContext = createContext<Partial<ContextProps>>({})

const AppProvider = ({children}:any) => {
    // app states 
    const [isSent , setIsSent] = useState<boolean>(false)
    const [isTuggle , setIsTuggle] = useState<boolean>(false)
    const [currentAccount , setCurrentAccount] = useState<string>('')
    const [formData , setFormData] = useState<FormData>({address: '', amount: '', password: '', message: ''})
    const [transactionCount , setTransactionCount] = useState<number|string|null>(localStorage.getItem('transactionCount'))

    // functions 
    const checkIfWalletConnected = async () => {
        if(!ethereum) return alert('Please install metamask!')
        
        const accounts = await ethereum.request({ method: 'eth_accounts'})
        
        if(accounts.length){
            setCurrentAccount(accounts[0])
        }
        
    }
    

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask!')
            

            const transactionContract:any = getEthereumContract()

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: '0xEcc7BC7d9fa79B8077690D0eF166cae3d182D91d',
                    to: formData.address,
                    gas: '0x5208',
                    value: ethers.utils.parseEther(formData.amount)._hex
                }]
            });

            const transactionHash = await transactionContract?.addToBlockchain(formData.address,formData.amount,formData.password,formData.message)
            
            setIsSent(true);
            console.log('loading');
            await transactionHash.wait();

            setIsSent(false)
            console.log('success')

            const transactionCount = await transactionContract.getTransactionCount()

            setTransactionCount(Number(transactionCount))
        } catch (error) {
            console.log(error)
            
        }
    }
    
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install metamask!')
            
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'})

            setCurrentAccount(accounts[0])
        } catch(error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        checkIfWalletConnected()
    },[])

    return (
        <AppContext.Provider value={{
            isSent,
            setIsSent,
            isTuggle,
            setIsTuggle,
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            sendTransaction
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider , AppContext }