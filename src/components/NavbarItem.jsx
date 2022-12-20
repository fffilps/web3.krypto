const navLinks = [
   {
    title: "Market",
    link: "https://coinmarketcap.com/",
  },

   {
    title: "Exchange",
    link: "https://coinmarketcap.com/rankings/exchanges/",
  },
   {
    title: "Tutorials",
    link: "https://web3.career/learn-web3",
  },
   {
    title: "Wallets",
    link: "https://metamask.io/",
  },
];

const NavbarItem = ({ classProps }) => {
 return ( navLinks.map((item, index) => {
    return <a key={item + index} className={`mx-4 cursor-pointer ${classProps} hover:text-blue-300`} target={"_blank"} href={item.link}>{item.title}</a>
  })
 )
};

export default NavbarItem
{
  /* <a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://coinmarketcap.com/"}>Market</a>
<a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://coinmarketcap.com/rankings/exchanges/"}>Exchange</a>
<a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://web3.career/learn-web3"}>Tutorials</a>
<a className='text-white text-base text-center mx-2 cursor-pointer hover:text-blue-300' target={"_blank"} href={"https://metamask.io/"}>Wallets</a> */
}
