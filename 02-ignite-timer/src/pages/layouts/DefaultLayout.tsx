import { Header } from "../../components/Header/Header";
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from "./styles";

export function DefaultLayout(){
    return (
        <LayoutContainer>
            <Header />
            {/* 
                O (Outlet) serve para podermos reaproveitar elementos na tela.
                O Header de um site é algo fixo em todas as paginas, porem 
                utilizando o Outlet, o componente e carregado somente uma vez.
                Se não for assim o componente seria recarregado em todas as rotas que
                o chamarem causando uma perca no desempenho. Confira o arquivo de 
                routas para entender o restante.
            */}
            <Outlet />
        </LayoutContainer>
    )
}