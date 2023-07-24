import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesContainer } from "@/styles/pages/success";
import { SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";


interface SuccessProps {
    customerName: string,
    productImages: string[],
}

export default function Success({customerName, productImages}: SuccessProps){
    console.log(productImages)
    return (
        <>
            <Head>
                <title>Compra Efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <ImagesContainer>
                    {/* {productImages.map((img, index) => (
                        <ImageContainer key={index}>
                            <Image src={img} width={120} height={110} alt={""} />
                        </ImageContainer>
                    ))} */}
                </ImagesContainer>
                
                <h1>Compra efetuada!</h1>

                <p>
                    {/* Uhuul <strong>{customerName}</strong>, sua compra de
                    <strong>{productImages.length}</strong> já está a caminho da sua casa.  */}
                </p>

                <Link href='/'>
                    Voltar ao Catágolo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query, params}) => {

    if(!query || !query.session_id){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const productsImages = session.line_items?.data.map(item => {
        const product = item.price?.product as Stripe.Product
        return product.images[0]
    })
    
    let customerName
    if (session.customer_details && session.customer_details.name) {
        customerName = String(session.customer_details.name)
    }

    return {
        props: {
            customerName,
            productsImages,
        }
    }
}
