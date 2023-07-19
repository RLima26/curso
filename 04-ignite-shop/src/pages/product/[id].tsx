import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import {stripe} from "../../lib/stripe";
import axios from "axios";
import { useState } from "react";

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}

export default function ProductId({product}: ProductProps){

    const [isCreatingCheckoutSession, SetIsCreatingCheckoutSession] = useState(false)

    async function handleByProduct(){
        
        try {

            SetIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const {checkoutUrl} = response.data

            window.location.href = checkoutUrl
            
        } catch (error) {
            // Quando houver erro o recomendado é conectar com uma ferramenta de 
            // observalibilidade (datalog, sentry)

            SetIsCreatingCheckoutSession(false)
            alert('falhou')
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button onClick={handleByProduct} disabled={isCreatingCheckoutSession}>
                    Comprar
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {id: 'prod_OFXYYrtaBDeZNo'}
            },
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any,{id: string}> = async ({params}) => {

    const productId = params?.id ? params.id : ''
    const product = await stripe.products.retrieve(productId,{
        expand: ['default_price']
    })
    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format((price.unit_amount!) / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1 // 1h
    }
}