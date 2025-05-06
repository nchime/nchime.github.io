import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1
      className="sm:leading-2 rounded-lg pb-2 pt-4 text-xl font-extrabold leading-9 tracking-tight sm:text-xl md:text-4xl md:leading-14"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/shiny-white-gray-background-with-wavy-lines_1017-25101.jpg?t=st=1746510956~exp=1746514556~hmac=7be1b4f23bdfc361c1c4ac9fce10be8ae6c391d23d012ad9780f95a09ef559f1&w=1060")',
        color: '#2c3e50',
      }}
    >
      {children}
    </h1>
  )
}
