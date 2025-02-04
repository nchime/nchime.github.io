'use client' // 클라이언트 컴포넌트로 명시

import React from 'react'

interface StyledButtonProps {
  children: React.ReactNode
}

const StyledButton: React.FC<StyledButtonProps & { images: string[] }> = ({ images }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className="w-1/4 transform-gpu cursor-pointer p-2 transition-transform duration-100 ease-in-out hover:scale-150"
        />
      ))}
    </div>
  )
}

export default StyledButton
