'use client' // 클라이언트 컴포넌트로 명시

import React from 'react'

interface StyledButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({ children }) => {
  return (
    <button className="rounded bg-blue-500 px-4 py-4 font-bold text-white hover:bg-blue-200">
      {children}
    </button>
  )
}

export default StyledButton
