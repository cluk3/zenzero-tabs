import styledSanitize from "styled-sanitize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    ${styledSanitize}
    body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    }
`;
