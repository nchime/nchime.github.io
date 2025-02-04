'use client'

export default function InteractiveBox() {
  const handleClick = () => alert('Box clicked!')
  const handleMouseOver = () => console.log('Mouse over box!')

  return (
    <button
      style={{ padding: '20px', backgroundColor: 'lightblue', cursor: 'pointer', border: 'none' }}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOver}
      onBlur={handleMouseOver}
    >
      Click or hover here!
    </button>
  )
}
