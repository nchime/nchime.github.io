'use client'

export default function InteractiveBox() {
  const handleClick = () => alert('Box clicked!')
  const handleMouseOver = () => console.log('Mouse over box!')

  return (
    <div
      style={{ padding: '20px', backgroundColor: 'lightblue', cursor: 'pointer' }}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      Click or hover here!
    </div>
  )
}
