import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1
      className="rounded-lg pb-2 pt-4 text-2xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-14"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFQiVCMCVCMCVFQSVCMiVCRHxlbnwwfHwwfHx8MA%3D%3D")',
        color: '#2c3e50',
      }}
    >
      {children}
    </h1>
  )
}
