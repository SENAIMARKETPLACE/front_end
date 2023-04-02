import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './CarouselProducts.module.scss'


export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        <div className={styles.embla__slide}>Slide 1</div>
        <div className={styles.embla__slide}>Slide 2</div>
        <div className={styles.embla__slide}>Slide 3</div>
      </div>
    </div>
  )
}

// import styles from './CarouselProducts.module.scss'
// import EmblaCarousel, {
//     EmblaCarouselType,
//     EmblaOptionsType,
//     EmblaPluginType,
//     EmblaEventType,
//   } from 'embla-carousel'


  
// const CarouselProducts = () => {
//     return (
//         <div>
//             TROXA
//         </div>
//     )
// }

// export default CarouselProducts;