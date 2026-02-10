import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const App = () => {

  const [heroContent, setHeroContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    tl.to('.vi-mask-group', {
      rotate:15,
      duration:2,
      ease:"Power4.easeinOut",
      transformOrigin:"50% 50%"
    })
    .to(".vi-mask-group", {
      scale:26,
      duration:2,
      delay:-1.8,
      ease:"Expo.easeInOut",
      transformOrigin:"50% 50%",
      opacity:0,
      onUpdate: function() {
        if(this.progress() >= .9){
          document.querySelector('.svg').remove();
          setHeroContent(true);
          this.kill();
        }
      }
    })

  })  


  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000000]'>
        <svg viewBox='0 0 800 600' preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text
                  x='50%'
                  y='50%'
                  fontSize='250px'
                  textAnchor='middle'
                  fill='white'
                  
                  dominantBaseline='middle'
                  fontFamily='Arial Black'
                >
                  VI   
                </text>
              </g>
            </mask>
          </defs>
          <image 
            href='./bg1.png'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#viMask)'
          />
        </svg>
      </div>
      {heroContent && <div className='main w-full'>
        <div className='landing w-full h-screen bg-black'>
          <div className='images-div relative w-full h-screen '>
            <img className=' absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
            {/* sky image above */}
            <img className='absolute top-0 left-0 w-full h-full object-cover' src="./bg2.png" alt="" />
            <img className='absolute -bottom-115 scale-[0.4] w-full ' src="./gl.png" alt="" />
          </div>
        </div>
        </div>}
    </>
  )
}

export default App