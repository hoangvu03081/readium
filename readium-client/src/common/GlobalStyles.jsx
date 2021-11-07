import { createGlobalStyle } from "styled-components";

import Raleway from "../assets/fonts/Raleway-Regular.ttf";
import RalewayBold from "../assets/fonts/Raleway-Bold.ttf";
import PublicSans from "../assets/fonts/PublicaSans-Light.otf";

const GlobalStyles = createGlobalStyle`
    *, *:after, *:before {
        box-sizing: border-box;
    }
    body{
        margin: 0;
    }

    @font-face {
        font-family: "Raleway";
        src: url(${Raleway}) format('truetype'), local('Raleway');
    }
    @font-face {
        font-family: "Raleway";
        src: url(${RalewayBold}) format('truetype'), local('Raleway Bold');
        font-weight: bold;
    }
    @font-face {
        font-family: "Publica Sans";
        src: url(${PublicSans}) format('opentype'), local('Publica Sans Light')
    }

    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: 'Raleway', Arial, 'Segoe UI';
    }
`;

export default GlobalStyles;
