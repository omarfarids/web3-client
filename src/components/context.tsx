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

const AppContext = createContext<Partial<ContextProps>>({})

const AppProvider = ({children}:any) => {
    // app states 
    const [isSent , setIsSent] = useState<boolean>(false)
    const [isTuggle , setIsTuggle] = useState<boolean>(false)
    const [currentAccount , setCurrentAccount] = useState<string>('')
    const [formData , setFormData] = useState<FormData>({address: '', amount: '', password: '', message: ''})
    const [transactionCount , setTransactionCount] = useState<number|string|null>(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState<any[]>([]);

    // functions 
    const getEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(currentAccount || contractAddress, contractABI, signer)
    
        return transactionContract;
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();
        
                const availableTransactions = await transactionsContract.getAllTransactions();
        
                const structuredTransactions = availableTransactions.map((transaction:any) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
        
                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
            } catch (error) {
            console.log(error);
            }
        };

    const checkIfWalletConnected = async () => {
        if(!ethereum) return alert('Please install metamask!')
        
        const accounts = await ethereum.request({ method: 'eth_accounts'})
        
        getAllTransactions()
        if(accounts.length){
            setCurrentAccount(accounts[0])
        }

    }
    
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract:any = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount()


            window.localStorage.setItem('transactionCount',transactionCount)


        } catch (error) {
            console.log(error)
        }

    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask!')
            
            
            const transactionContract:any = getEthereumContract()
            
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
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
        checkIfTransactionsExist()
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