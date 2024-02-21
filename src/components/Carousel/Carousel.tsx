// // CarouselComponent.tsx
// import "swiper/css";
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';
// // import { Swiper, SwiperSlide } from "swiper/react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Virtual, Controller, Navigation, Pagination } from "swiper/modules";
// import sprite from "../../assets/weather-icons/sprite.svg";
// import "./Carousel.css";
// import { ReactNode } from "react";
// interface CarouselProps {
//   items: any;
//   element: ReactNode;
// }

// const CarouselComponent = ({ items, element }: CarouselProps) => {
//   const slides = Array.from({ length: 10 }).map(
//     (el, index) => `Slide ${index + 1}`
//   );
//   return (
//     <div style={{ width: "400px" }}>
//       <Swiper
//         modules={[Virtual, Controller, Navigation, Pagination]}
//         spaceBetween={50}
//         slidesPerView={2}
//         virtual
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-previous",
//         }}
//         pagination={{ clickable: true }}
//         className="carousele"
//       >
//         {slides.map((slideContent, index) => (
//           <SwiperSlide key={slideContent} virtualIndex={index}>
//             {({ isActive }) => (
//               <div>Current slide is {isActive ? "active" : "not active"}</div>
//             )}
//           </SwiperSlide>
//         ))}

//         <div className="actions-slider">
//           <div className="swiper-button-previous">
//             <svg className="weather-item__icon">
//               <use href={`${sprite}#icon-previous`} />
//             </svg>
//           </div>
//           <div className="swiper-button-next">
//             <svg className="weather-item__icon">
//               <use href={`${sprite}#icon-next`} />
//             </svg>
//           </div>
//         </div>
//       </Swiper>
//     </div>
//   );
// };

// export default CarouselComponent;
