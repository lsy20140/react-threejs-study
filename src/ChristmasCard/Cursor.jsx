import React, { useEffect } from 'react'
import './Cursor.css'

let mouseX = 0;
let mouseY = 0;

export default function Cursor() {

  useEffect((e) => {
    const mouseEventListener = document.addEventListener(
      "mousemove", 
      function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      }
    )

    const animateEvent = requestAnimationFrame(animate) 
    return () => {
      document.removeEventListener("mousemove", mouseEventListener)
      cancelAnimationFrame(animateEvent)
    }
  })

  return (
    <>
      <div className='cursor-dot cursor-dot--outline' ></div>
      <div className='cursor-dot'></div>
    </>
  )
}
