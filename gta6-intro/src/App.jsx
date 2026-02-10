import React from 'react'

const App = () => {
  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-[2] w-full h-screen overflow-hidden bg-[#000000]'>
        <svg viewBox='0 0 800 600 preserveAspectRatio="XMidYMid slice'>
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  fill='white'
                  fontSize='250px'
                  dominantBaseline='middle'
                  fontFamily='Arial Black'
                >
                  VI   
                </text>
              </g>
            </mask>
          </defs>
          <image 
            href='./bg.jpg'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#viMask)'
          />
        </svg>
      </div>
    </>
  )
}

export default App