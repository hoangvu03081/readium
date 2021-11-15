import React from 'react'
import TrendingBtn from './TrendingBtn'
import TagBtn from "./TagBtn"
import Interactions from './Interactions'
import LoveComment from './LoveComment'
import FollowBtn from './FollowBtn'

export default function Buttons() {
    return (
        <div>
            <TrendingBtn>#technique</TrendingBtn>

            <br/><br/><br/>

            <TagBtn>#programming</TagBtn>

            <br/><br/><br/>

            <Interactions WatchNumber={10253} LoveNumber={3021} CommentNumber={2050}/>

            <br/><br/><br/>

            <LoveComment LoveNumber={"3k"} CommentNumber={25}/>

            <br/><br/><br/>

            <FollowBtn/>
        </div>
    )
}
