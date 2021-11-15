import styled from 'styled-components'

const Comment = styled.button`
    font-family: "Nunito";
    font-size: 18px;
    font-weight: bold;
    border: none;
    background-color: ${({ theme }) => theme.colors.InteractionsBackground};
    color: ${({ theme }) => theme.colors.CommentText};
    svg {
        fill: ${({ theme }) => theme.colors.CommentText};
        font-size: 18px;
    }
    span {
        padding-left: 8px;
    }
    display: flex;
    align-items: center;
`

export default Comment;