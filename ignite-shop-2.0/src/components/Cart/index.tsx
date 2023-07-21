import { CartButton } from "../CartButton";
import * as Dialog from '@radix-ui/react-dialog'
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";
import imgCamisa from '../../assets/Type=2_explorer-t-shirt 1.png'


export function Cart(){
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>
         
            <Dialog.Portal>
                <CartContent>
                    <CartClose>
                        <X size={24} weight="bold" />
                    </CartClose>

                    <h2>Sacola de compras</h2>

                    <section>
                        {/* <p>Parece que seu carrinho está vazio :(</p> */}
                    
                        <CartProduct>
                            <CartProductImage>
                                <Image 
                                    width={100}
                                    height={93}
                                    alt=""
                                    src={imgCamisa}
                                />
                            </CartProductImage>

                            <CartProductDetails>
                                <p>PRoduto 1</p>
                                <strong>R$ 50,00</strong>
                                <button>Remover</button>
                            </CartProductDetails>
                        </CartProduct>
                    </section>

                    <CartFinalization>
                        <FinalizationDetails>
                            <div>
                                <span>Quantidade</span>
                                <p>2 itens</p>
                            </div>
                            <div>
                                <span>Valor Total</span>
                                <p>R$ 100,00</p>
                            </div>
                        </FinalizationDetails>

                        <button>Finalizar Compra</button>
                    </CartFinalization>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}