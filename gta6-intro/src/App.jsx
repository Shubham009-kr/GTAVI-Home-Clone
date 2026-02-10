import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { RiArrowDownLine } from '@remixicon/react'

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

  useGSAP(() => {
    const main = document.querySelector('.main');

    main?.addEventListener("mousemove", function(e){
      const xValue = (e.clientX / window.innerWidth - 0.5)*40;
      const y = e.clientY / window.innerHeight - 0.5;

      gsap.to('.images-div .title-text', {
        x: `${xValue * .4}%`,
      })
      gsap.to('.sky', {
        x: xValue,
      })
      gsap.to('.bg', {
        x: xValue*1.7,
      })
      gsap.to('.character', {
        x: -xValue,
      })
    })
  }, [heroContent])

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
        <div className='landing relative w-full h-screen bg-black'>
          <div className='navbar absolute w-full top-0 left-0 z-[10] py-10 px-10 '>
            <div className='logo flex items-center gap-8'>
              <div className='lines flex flex-col gap-1'>
                <div className='line w-10 h-1 bg-white'></div>
                <div className='line w-5 h-1 bg-white'></div>
                <div className='line w-7 h-1 bg-white'></div>

              </div>
              <h3 className='text-2xl -mt-1 leading-none'>Rockstar</h3>
            </div>
          </div>
          
          <div className='images-div relative w-full h-screen overflow-hidden '>
            <img className='sky absolute bottom-0 left-0 w-full scale-105 object-cover' src="./sky.png" alt="" />
            {/* sky image above */}
            <img className='bg absolute top-0 left-0 w-full h-full scale-110 object-cover' src="./bg2.png" alt="" />
            <div className='title-text absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <h1 className='text-7xl -ml-20'>grand</h1>
              <h1 className='text-7xl ml-5'>theft</h1>
              <h1 className='text-7xl -ml-5'>auto</h1>
            </div>
            <img className='character absolute bottom-0 left-1/2 -translate-x-1/2  w-[40%]' src="./gl.png" alt="" />
          </div>
          <div className='btm-bar w-full py-10 px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent'>
            <div className='flex gap-4'>
              <RiArrowDownLine />
              <h3 className='text-white font-[Helvetica] items-center'>Scroll Down</h3>
            </div>
            <img src="./ps5.png" className='h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' alt="" />
          </div>
        </div>
        <div className='w-full h-screen relative pl-10 flex items-center justify-center bg-black'>
          <div className='cont relative w-full h-[80%]  '>
            <div className='l-img h-full'>
              <img className='absolute right-0 w-1/2 ' src="./gl2.png " alt="" />
            </div>
          </div>
          
        </div>
        
        </div>}
    </>
  )
}

export default App