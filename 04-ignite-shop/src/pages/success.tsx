import { stripe } from "@/lib/stripe";
import { ImageContainer } from "@/styles/pages/success";
import { SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";


interface SuccessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string,
    }
}

export default function Success({customerName, product}: SuccessProps){
    return (
        <SuccessContainer>
            
            <h1>Compra efetuada!</h1>

            <ImageContainer>
                <Image src={product.imageUrl} width={120} height={110} alt={""} />
            </ImageContainer>

            <p>
                Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. 
            </p>

            <Link href='/'>
                Voltar ao Catágolo
            </Link>

        </SuccessContainer>
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

    const productName = session.line_items?.data[0]?.price?.product?.name
    const productImg = session.line_items?.data[0]?.price?.product?.images[0]
    
    let customerName
    if (session.customer_details && session.customer_details.name) {
        customerName = String(session.customer_details.name)
    }

    return {
        props: {
            customerName,
            product: {
                name: productName,
                imageUrl: productImg
            }
        }
    }
}
