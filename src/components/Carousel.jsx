import React, { useState, useEffect, Fragment } from 'react';


const Carousel = () => {
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isHovered, setIsHovered] = useState(false);
 const slideCount = 4;
 const img = [
   {
     imgurl: "https://flowbite.com/docs/images/carousel/carousel-2.svg"
   },
   {
     imgurl: "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/39ce18e9-0c4a-4b15-80f2-29e07f961d96.webp"
   },
   {
     imgurl: "https://flowbite.com/docs/images/carousel/carousel-3.svg"
   },
   {
     imgurl: "https://flowbite.com/docs/images/carousel/carousel-4.svg"
   },
 ];


 useEffect(() => {
   if (!isHovered) {
     const interval = setInterval(() => {
       setCurrentSlide((prev) => (prev + 1) % img.length);
     }, 5000);
     return () => clearInterval(interval);
   }
 }, [isHovered]);


 const goToSlide = (index) => {
   setCurrentSlide(index);
 };


 const prevSlide = () => {
   setCurrentSlide((prev) => (prev - 1 + img.length) % img.length);
 };


 const nextSlide = () => {
   setCurrentSlide((prev) => (prev + 1) % img.length);
 };


 return (
     <Fragment>
   {/* carousel start */}
   <div
     id="default-carousel"
     className="relative w-full"
     data-carousel="slide"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
   >
     <div className="relative h-40 overflow-hidden rounded-lg md:h-64">
       {img.map((im, index) => (
         <div
           key={index}
           className={`duration-700 ease-in-out ${currentSlide === index ? 'block' : 'hidden'}`}
           data-carousel-item
         >
           <img
             src={im.imgurl}
             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
             alt="..."
           />
         </div>
       ))}
     </div>


     <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
       {img.map((_, index) => (
         <button
           key={index}
           type="button"
           className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
           aria-current={currentSlide === index}
           aria-label={`Slide ${index + 1}`}
           data-carousel-slide-to={index}
           onClick={() => goToSlide(index)}
         ></button>
       ))}
     </div>


     <button
       type="button"
       className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
       data-carousel-prev
       onClick={prevSlide}
     >
       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
         <svg
           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
           aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 6 10"
         >
           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
         </svg>
         <span className="sr-only">Previous</span>
       </span>
     </button>
     <button
       type="button"
       className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
       data-carousel-next
       onClick={nextSlide}
     >
       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
         <svg
           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
           aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 6 10"
         >
           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
         </svg>
         <span className="sr-only">Next</span>
       </span>
     </button>
   </div>
   {/* carousel end */}
  
   </Fragment>


 );
};


export default Carousel;

