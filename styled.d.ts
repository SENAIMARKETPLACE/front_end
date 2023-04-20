import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    
    // adicione aqui as suas propriedades personalizadas
  }

  export interface IntrinsicAttributes {
    SectionIcone?: string; // adicione aqui a sua propriedade personalizada
    TituloModal?: string; //
    ButtonRedirecionamento?: string
}
}
