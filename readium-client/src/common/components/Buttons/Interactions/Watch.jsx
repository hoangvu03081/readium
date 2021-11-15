import styled from 'styled-components'

const Watch = styled.button`
    font-family: "Nunito";
    font-size: 18px;
    font-weight: bold;
    border: none;
    background-color: ${({ theme }) => theme.colors.InteractionsBackground};
    color: ${({ theme }) => theme.colors.WatchText};
    svg {
        fill: ${({ theme }) => theme.colors.WatchText};
        font-size: 18px;
    }
    span {
        padding-left: 8px;
    }
    display: flex;
    align-items: center;
`

export default Watch;