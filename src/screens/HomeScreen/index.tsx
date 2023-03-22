import React from "react";
import { MdGroups, MdPerson, MdStar, MdStore } from "react-icons/md";
import HeaderSollaris from "../../layout/Header";
import styles from "./HomeScreen.module.scss";
import beneficios1 from "../../../public/images/beneficios1.png";
import Link from "next/link";
import FooterSollaris from "../../layout/Footer";

const HomeScreen = () => {
  return (
    <>
      <HeaderSollaris></HeaderSollaris>
      <main className={styles.sectionMain}>
        <section className={styles.sectionMain__principal}>
          <div className={styles.sectionMain__Slogan}>
            <h3>Sollaris</h3>
            <p>
              Com a Sollaris, a saúde, bem-estar e esporte estão a apenas um
              clique de distância!
            </p>
            <div className={styles.sectionMain__Imagens}>
              <img
                className={styles.imagensApresentacao}
                src="https://s3-alpha-sig.figma.com/img/70de/f108/490833ebcc616e482f01a385c5e1e93e?Expires=1680480000&Signature=FI~c5G0Onc6Wq3SPAQ49EhG-N3Vnj3iY997dn-w~YUyfoaJr0NHuPDpG-MJZdgMHaOLwbLDXMQ9Wl9kN1BF32I59W2s4BBrpU9YIJr8aaux9uMQN379sx9VRld8DGW8L6GhlDvQ6gkXi5nkGPMbJbemFzp6TEBkzKsrQkrJh8TnmKjzy1DIT1YWml0ro-CnzX~HXtaqAyxh8eol-SPtvWBTpCtPhkOqdnjnQvKz3VHwpWqDeCqV5qMFxUI4Drxld60VL67cWu0BMWmUrmxIuUi9zVeRANutauITaVDn5hOM5Iyy40d1uJOply5UUG0FRu7Q3tNIAxCG~zP00c5avRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt="Produtos"
              />
              <img
                className={styles.imagensApresentacao}
                src="https://s3-alpha-sig.figma.com/img/3327/93ec/8e365dee3150bb68d39bdf82fde3404d?Expires=1680480000&Signature=N7mFxxJQnLaCSTpRIADsSZS~fcNDKz630Ccr-Ol1Bgn-wUiOJu2c30QU9b4UotfgsmRwswNSfocf4JQvdHQ6S9UORhpSTlArJYJKnamOt2UuGlKrj9b1njsUexoT8mgBFkDtfYWDOeQkD7HdRCeL6eQNYk-h-4fNNag3iYobjc33M8XY6~aaRBcgGVwmNzpvOJa~bFCjjMPAh9Wnw65FlkXMzL5GzICtZe5stvdFm5ogF3kRbjHr9zlZpPuWTtih~mK3shspVRsy~25HLuFLUikNcg9bpkoZY7WCZ43Z93mi39VfPNfeg7IGGIGPmr5PIwmS59PgU8c2mtU8oGmKtA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt="Produtos"
              />
              <img
                className={styles.imagensApresentacao}
                src="https://s3-alpha-sig.figma.com/img/371b/daea/4282e731f24f5b566f461c1918f38b5d?Expires=1680480000&Signature=RtSiNyk5fxW7wqdfAYik8Pj2FiEg-ORjXR-D~xoApYD24i8qchEDyt8jjl5zrpiHP0HVFXxwbSPkFAjy4AZSYUC2Bp~yM97yhDxdwEX-l2BEwRauwnZikP1edShRrjndDz4gSDsdgPvBG9dBsS6qQCmIIOEWPn1n4BOeVvpHQiKBhQf7XOZUg2sv7DCw3gTn4ZbQjhDDr7mxAb7Bwt2r25xNkBe8CiL7dUvMs0WdMBCOdASyKY-8mmBGO1HOQjSC~Lhoj3KoOxX9K1bUsvlOqmDCZjHtJKA~bTsoj8HkNQStZA6tN5Qvkx3euAP6vW97phxYjABCy34srwLqa5dCrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt="Produtos"
              />
            </div>
          </div>
          <div>
            <img
              src="https://s3-alpha-sig.figma.com/img/a452/909b/1e6cf4ce2867f6e11ae5b5a23e4f50e1?Expires=1680480000&Signature=Tst1j47-fwNsDb4sbBlTH~EuQICkQTg7GBa0j33hDg2VC-sBZn886JfAwRV8L4kKBVHkL3LClyQ78EaOml12LxIhpsBTdIHhXBi3XeoxrgWpwN6u9ivO8n6osKWguUklw6E30oyozIZI-idSX6phOviHRfzRTP3JRVy163bEt8k5Yl9BK4oyEHi6kkh8HtQbYMqQiq-wuMIB1TR-7ymEOVDi3yO2Y~zI825RVuqmKyY-ytkr1Ba1P2RRh9ISiHzbKjIwVxs55jWTS5ZbMUV1tPtr-KxPrw-A-TkROeRA0GTUByHBOy9eDLAORDL1AIvw207uOZTpLIRO1dledGprLw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt=""
            />
          </div>
        </section>
        {/* ============================================================ */}
        <section className={styles.sectionUser}>
          <div className={styles.sectionUser__texto}>
            <div>
              <div className={styles.sectionUser__texto__titulo}>
                <h3>BENEFÍCIOS PARA USUÁRIOS</h3>
                <MdPerson />
              </div>
              <div className={styles.sectionUser__texto__descricao}>
                A <span>Sollaris</span> oferece um{" "}
                <span>
                  marketplace e rede social que ajuda pessoas como você a
                  alcançar seus objetivos relacionados a saúde e esporte.
                </span>
                Em nosso site, você encontrará{" "}
                <span>
                  uma ampla variedade de produtos de alta qualidade, desde
                  equipamentos de ginástica até suplementos nutricionais, tudo
                  em um só lugar.
                </span>{" "}
                Além disso, você pode ler{" "}
                <span>artigos informativos e educacionais</span> para se manter
                atualizado sobre as últimas tendências e dicas de saúde e
                esporte.
              </div>
            </div>
            <div className={styles.sectionUser__texto__imagem}>
              <img src={beneficios1.src} alt="produtos" />
            </div>
          </div>

          <div className={styles.sectionUser__btnRedirect__signUser}>
            <Link href="/cadastro-usuario">
              <div>CADASTRE-SE COMO USUÁRIO</div>
            </Link>
          </div>
        </section>

        {/*  ================================================= */}
        <section className={styles.sectionEmpresa}>
          <div className={styles.sectionEmpresa__sectionTexto}>
            <div>
              <div className={styles.sectionEmpresa__sectionTexto__titulo}>
                <h3>BENEFÍCIOS PARA EMPRESAS</h3>
                <MdStore />
              </div>
              <div className={styles.sectionEmpresa__sectionTexto__descricao}>
                Para empresas cadastradas, a{" "}
                <span>
                  Sollaris oferece uma plataforma online cheia de entusiastas de
                  esportes
                </span>{" "}
                que querem comprar equipamentos e acessórios com facilidade,{" "}
                <span>
                  além de fornecer ferramentas como personalização da sua loja
                  virtual e gerenciamento de pedidos, estoque e envios para
                  ajudar as empresas a maximizar sua rentabilidade.
                </span>
              </div>
            </div>
            <div className={styles.sectionEmpresa__sectionTexto__imagem}></div>
          </div>
          <div className={styles.sectionEmpresa__beneficios}>
            <h3>
              DADOS DO COMÉRCIO ELETRÔNICO E MAIS VANTAGENS DE ESTAR NA SOLLARIS
            </h3>
            <div className={styles.sectionEmpresa__beneficios__lista}>
              <div className={styles.beneficios}>
                <h6>
                  <MdStar />
                </h6>
                <p>
                  O comércio eletrônico global atingiu US$ 4,2 trilhões em
                  vendas em 2020 e espera-se que alcance US$ 6,4 trilhões em
                  2024. (Fonte: Statista)
                </p>
              </div>
              <div className={styles.beneficios}>
                <h6>
                  <MdStar />
                </h6>
                <p>
                  Controle : Tenha controle sobre sua loja, aqui você tem o
                  poder de personalizar sua loja, controlar o seu estoque e
                  muito mais.
                </p>
              </div>
              <div className={styles.beneficios}>
                <h6>
                  <MdStar />
                </h6>
                <p>
                  As vendas online em todo o mundo aumentaram em 27,6% em 2020
                  devido à pandemia do COVID-19, que levou ao aumento das
                  compras online e à mudança de comportamento do consumidor.
                  (Fonte: Digital Commerce 360)
                </p>
              </div>
              <div className={styles.beneficios}>
                <h6>
                  <MdStar />
                </h6>
                <p>
                  Visibilidade: Poste seus produtos, mantenha-se ativo na rede,
                  para que você ganhe visibilidade e consumidores conheçam e
                  consigam adquirir seus produtos.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.sectionEmpresa__btnRedirect__signEmpresa}>
            <Link href="/cadastro-empresa">
              <div>CADASTRE A SUA LOJA</div>
            </Link>
          </div>
        </section>
        <section className={styles.sectionServicos}>
          <div className={styles.sectionServicos__sectionTexto}>
            <div>
              <div className={styles.sectionServicos__sectionTexto__titulo}>
                <h3>BENEFÍCIOS PARA PRESTADORES DE SERVIÇOS</h3>
                <MdGroups />
              </div>
              <div className={styles.sectionServicos__sectionTexto__descricao}>
                Aqui também temos espaços para profissionais que estão dispostos
                a realizarem seus serviços relacionados com saúde, bem-estar ou
                esportes. Oferecemos ferramentas de agendamento online de
                serviços, personalização do seus perfil, suporte com a
                plataforma, feedbacks de usuários que já tiveram experiências
                com seus serviços e muito mais.
              </div>
            </div>
            <div className={styles.sectionServicos__sectionTexto__imagem}></div>
          </div>
          
          <div className={styles.sectionServicos__btnRedirect__signEmpresa}>
            <Link href="/#">
              <div>CADASTRE SEUS SERVIÇOS</div>
            </Link>
          </div>
        </section>
      </main>
      <FooterSollaris></FooterSollaris>
    </>
  );
};
export default HomeScreen;
