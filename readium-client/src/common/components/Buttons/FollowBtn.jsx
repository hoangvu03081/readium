import React from 'react'
import styled from 'styled-components'
import { ReactComponent as FollowIcon } from '../../../assets/icons/follow.svg'

const FollowBtnStyle = styled.button`
    border: 2px solid black;
    border-radius: 50%;
    height: 38px;
    width: 38px;
    background-color: ${({ theme }) => theme.colors.FollowBtnBackground};
    svg {
        fill: ${({ theme }) => theme.colors.FollowBtnText};
        font-size: 20px;
    }
`

export default function FollowBtn() {
    return (
        <FollowBtnStyle>
            <FollowIcon/>
        </FollowBtnStyle>
    )
}