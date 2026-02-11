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

  const cardContainer = document.querySelectorAll('.card-container');

  cardContainer.forEach((cardContainer) => {
    const cardPaths = cardContainer.querySelectorAll('.svg-stroke svg path');

    cardPaths.forEach((path) =>{
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    let tl;

    cardContainer.addEventListener("mouseenter", ()=>{
      if(tl) tl.kill();
      tl = gsap.timeline();

      cardPaths.forEach((path)=>{
        tl.to(path, {
          strokeDashoffset:0,
          attr: { "stroke-width": 850},
          duration:1.5,
          ease:"Power2.out",
        }, 0,);
      })
    })

    cardContainer.addEventListener("mouseleave", ()=>{
      if(tl) tl.kill();
      tl = gsap.timeline();

      cardPaths.forEach((path)=>{
        const length = path.getTotalLength();
        tl.to(path, {
          strokeDashoffset:length,
          attr: { "stroke-width": 200},
          duration:1,
          ease:"Power2.out",
        }, 0,);
      }) 
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
        <div className='w-full h-screen p-16'>
          <div className='row w-full h-full py-16 mb-16 flex gap-12'>
            <div className='card-container relative flex-1 aspect-square rounded-2xl overflow-hidden' id='card-1'> 
              <div className='card-img'>
                <img src="card1.png" className='w-full h-full object-cover' alt="" />
              </div>
              <div className='svg-stroke svg-stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] w-full h-full'>
                <svg className='w-full h-full object-cover' width="2453" height="2273" viewBox="0 0 2453 2273" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049
                  2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 
                  792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644
                  455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.25
                  2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463
                  2209.55 381.262 2209.55 381.262" 
                  stroke="#fe5e41" stroke-width="200" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='svg-stroke svg-stroke-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] w-full h-full'>
                <svg className='w-full h-full object-cover' width="2250" height="2535" viewBox="0 0 2250 2535" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78
                  1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969
                  1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198
                  427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 
                  1708.78 252.012C1437.81 -314.29 396.471 909.169 132.281
                  566.512C18.1772 401.672 244.781 193.012 244.781 193.012" 
                  stroke="#6e44ff" stroke-width="200" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='card-title absolute bottom-12 left-12 text-3xl text-black'>
                <h3>Camilia Cabello</h3>
              </div>
            </div>
            <div className='card-container relative flex-1 aspect-square rounded-2xl overflow-hidden' id='card-2'>
              <div className='card-img'>
                <img className='w-full h-full object-cover' src="card2.png" alt="" />
              </div>
              <div className='svg-stroke svg-stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] w-full h-full'>
                <svg className='w-full h-full object-cover' width="2453" height="2273" viewBox="0 0 2453 2273" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049
                  2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 
                  792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644
                  455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.25
                  2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463
                  2209.55 381.262 2209.55 381.262" 
                  stroke="#fe5e41" stroke-width="200" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='svg-stroke svg-stroke-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] w-full h-full'>
                <svg className='w-full h-full object-cover' width="2250" height="2535" viewBox="0 0 2250 2535" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78
                  1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969
                  1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198
                  427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 
                  1708.78 252.012C1437.81 -314.29 396.471 909.169 132.281
                  566.512C18.1772 401.672 244.781 193.012 244.781 193.012" 
                  stroke="#6e44ff" stroke-width="200" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='card-title absolute bottom-12 left-12 text-3xl text-black'>
                <h3>Emilia Sabidtzer</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='w-full h-screen relative pl-10 flex items-center justify-center bg-black'>
          <div className='cont relative w-full h-[80%]  '>
            <div className='l-img h-full'>
              <img className='absolute right-0 w-1/2 ' src="./gl2.png " alt="" />
            </div>
          </div>
          
        </div> */}
        
        </div>}
    </>
  )
}

export default App