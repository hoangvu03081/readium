import React from 'react'
import styled from 'styled-components'
import Watch from "./Watch"
import Love from "./Love"
import Comment from "./Comment"
import { ReactComponent as WatchIcon } from '../../../../assets/icons/watch.svg'
import { ReactComponent as LoveIcon } from '../../../../assets/icons/love.svg'
import { ReactComponent as CommentIcon } from '../../../../assets/icons/comment_1.svg'

const InteractionStyle = styled.div`
    border: 2px solid black;
    border-radius: 4px;
    width: 100%;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export default function Interactions({WatchNumber, LoveNumber, CommentNumber}) {
    return (
        <InteractionStyle>
            <Watch>
                <WatchIcon/>
                <span>{WatchNumber}</span>
            </Watch>

            <Love>
                <LoveIcon/>
                <span>{LoveNumber}</span>
            </Love>

            <Comment>
                <CommentIcon/>
                <span>{CommentNumber}</span>
            </Comment>
        </InteractionStyle>
    )
}