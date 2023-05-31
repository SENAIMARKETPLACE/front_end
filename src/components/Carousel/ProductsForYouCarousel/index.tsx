import { Carousel } from '@mantine/carousel';
import styles from './ProductsForYouCarousel.module.scss';
import Link from 'next/link';
import UsuarioProduto from 'components/UsuarioProduto';
import CardProdutoCarrossel from 'components/CardProdutoCarrossel';

const products = [
    {
        img: 'https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-academy-masculina/06/2IC-1838-006/2IC-1838-006_zoom2.jpg?ts=1614614671&ims=326x',
        name: 'Produto',
        preco: '200',
    },
    {
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-i-2223-sn-jogador-umbro-masculina/14/2IA-2583-014/2IA-2583-014_zoom1.jpg?ts=1652448214&ims=544x',
        name: 'Produto',
        preco: '300',
    },
    {
        img: 'https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-academy-masculina/06/2IC-1838-006/2IC-1838-006_zoom2.jpg?ts=1614614671&ims=326x',
        name: 'Produto',
        preco: '100',
    },
    {
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-i-2223-sn-jogador-umbro-masculina/14/2IA-2583-014/2IA-2583-014_zoom1.jpg?ts=1652448214&ims=544x',
        name: 'Produto',
        preco: '300',
    },
    {
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-i-2223-sn-jogador-umbro-masculina/14/2IA-2583-014/2IA-2583-014_zoom1.jpg?ts=1652448214&ims=544x',
        name: 'Produto',
        preco: '300',
    },
    {
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-i-2223-sn-jogador-umbro-masculina/14/2IA-2583-014/2IA-2583-014_zoom1.jpg?ts=1652448214&ims=544x',
        name: 'Produto',
        preco: '300',
    },
];

export default function ProductsForYouCarousel() {
    return (
        <Carousel
            slideSize="20%"
            slideGap="md"
            loop
            align="start"
            dragFree
            // breakpoints={[
            //     { maxWidth: '1250px', slideSize: '25%' },
            //     { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            // ]}
            // draggable={false}
            className={styles.carousel}
        >
            {products.map(product =>
                <Carousel.Slide>
                    1
                </Carousel.Slide>
                // <Carousel.Slide pb={20} >
                //     <UsuarioProduto
                        // id = { '1'}
                        // image = { product.img }
                        // name = { product.name }
                        // price = { product.preco }
                //     />
                // </Carousel.Slide>
            )}
            {/* <Carousel.Slide>
                ACABOU, VER MAIS.
            </Carousel.Slide> */}
            {/* ...other slides */}
        </Carousel>
    );
}
