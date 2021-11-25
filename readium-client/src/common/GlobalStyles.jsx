import { createGlobalStyle } from "styled-components";

import Raleway from "../assets/fonts/Raleway-Regular.ttf";
import RalewayBold from "../assets/fonts/Raleway-Bold.ttf";
import PublicSans from "../assets/fonts/PublicaSans-Light.otf";
import NunitoBold from "../assets/fonts/Nunito-Bold.ttf";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import PTSansBold from "../assets/fonts/PTSans-Bold.ttf";
import PTSansRegular from "../assets/fonts/PTSans-Regular.ttf";

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
    @font-face {
        font-family: "Nunito";
        src: url(${NunitoBold}) format('truetype'), local('Nunito Bold');
        font-weight: bold;
    }
    @font-face {
        font-family: "Lato";
        src: url(${LatoBold}) format('truetype'), local('Lato Bold');
        font-weight: bold;
    }
    @font-face {
        font-family: "PT Sans";
        src: url(${PTSansBold}) format('truetype'), local('PT Sans Bold');
        font-weight: bold;
    }
    @font-face {
        font-family: "PT Sans";
        src: url(${PTSansRegular}) format('truetype'), local('PT Sans Regular');
    }

    body {
        font-family: 'Raleway', Arial, 'Segoe UI';
    }
`;

export default GlobalStyles;
