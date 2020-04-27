import styledSanitize from "styled-sanitize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    ${styledSanitize}
    body {
        padding: 0;
        background-color: ${({ theme }) => theme.colors.background};
    }
    :focus {
            outline: ${(props) =>
              props.hasPressedTab
                ? "-webkit-focus-ring-color auto 5px;"
                : "none;"}
        }
`;
