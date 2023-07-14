import Image from "next/image";
import { HomeContainer } from "./home";
import {Product} from "./home";
import camisa1 from '../assets/Type=Camisa-Maratona 1.png'
import camisa2 from '../assets/Type=IgniteLab-T-shirt 1.png'
import camisa3 from '../assets/Type=Igniter-abord-2-t-shirt 1.png'
import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider'
import stripe from "stripe";
import { GetServerSideProps } from "next";

export default function Home() {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camisa1} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camisa2} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await stripe.products.list()
  
  console.log(response)
  
  return {
    props: {

    }
  }
}
