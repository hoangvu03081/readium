import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, *:after, *:before {
        box-sizing: border-box;
    }
    body{
        margin: 0;
    }
`;

export default GlobalStyles;
