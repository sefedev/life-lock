import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <nav className='px-4 md:px-16 lg:px2-24'>
      <Image src="/logo.png" alt="logo" width={120} height={100}/>
      <hr className='text-gray-300'/>
    </nav>
  )
}

export default Header
