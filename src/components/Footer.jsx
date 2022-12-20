import logo from '../../images/logo.png'
import kryptoLogoWhite from "../../images/web3_Krypto_white.png"

const Footer = () => {
  return (
    <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
    <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
    <div className='flex flex-[0.5] justify-center items-center'>
      <img src={kryptoLogoWhite} alt="logo" className='w-32' />
    </div>
    <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
    <a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://coinmarketcap.com/"}>Market</a>
    <a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://coinmarketcap.com/rankings/exchanges/"}>Exchange</a>
    <a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://web3.career/learn-web3"}>Tutorials</a>
    <a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://metamask.io/"}>Wallets</a>

    </div>

    </div>

    <div className='flex justify-center items-center flex-col mt-5'>
    <p className='text-white text-small text-center'>
      Explore With Us
    </p>
    <p className='text-white text-small text-center cursor-pointer'>
      <a className='cursor-pointer hover:text-blue-300' href='mailto:contact@marimultimedia.com'>contact@marimultimedia.com</a>
    </p>

    </div>
    <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />
    <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
    <p className='text-white text-small text-center'>
      @Web3.Krypto 2022
    </p>
    <p className='text-white text-small text-center'>
      All rights reserved
    </p>
    </div>
    </div>
  )
}

export default Footer