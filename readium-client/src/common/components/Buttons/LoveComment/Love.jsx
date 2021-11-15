import styled from 'styled-components'

const Love = styled.button`
    font-family: "Raleway";
    font-size: 18px;
    font-weight: bold;
    border: none;
    background-color: ${({ theme }) => theme.colors.LoveCommentBackground};
    color: ${({ theme }) => theme.colors.LoveCommentText};
    svg {
        fill: ${({ theme }) => theme.colors.LoveCommentText};
        stroke: ${({ theme }) => theme.colors.LoveCommentText};
        stroke-width: 0.5;
        font-size: 18px;
    }
    span {
        padding-left: 3px;
    }
    display: flex;
    align-items: center;
`

export default Love;