import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdOutlineThumbUpOffAlt, MdThumbDownAlt } from "react-icons/md";
import { MdOutlineThumbDownAlt } from "react-icons/md";
import { BsFillReplyFill } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { dislike, fetchFailure, fetchSuccess, like } from '../../redux/videoSlice.js';
import axios from 'axios';
import moment from 'moment';
import { MdThumbUpAlt } from "react-icons/md";
import { IoMdThumbsDown } from "react-icons/io";
import { subscription } from '../../redux/userSlice.js';
import Recommandation from '../components/Recommandation.jsx';

let times = (time) => {
    let timestamp = moment(`${time}`);
    let now = moment();
    let diffInHours = now.diff(timestamp, 'hours');
    if (diffInHours >= 24) {
        return `${now.diff(timestamp, 'days')} days ago`;
    } else {
        return `${diffInHours} hours ago`;
    }
}

function Video() {
  const{ currentUser } = useSelector(state => state.user);
  const { currentVideo } = useSelector(state => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2]
  // const[video, setVideo] = useState({}); reason for not create is 
  const[channel, setChannel] = useState({});
  // console.log(currentVideo);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        // setVideo(videoRes.data);
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log(error);
        dispatch(fetchFailure());
      }
    }
    fetchData()
  }, [path, dispatch])

  const handleLike = async() => {
    await axios.put(`/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id))
  }
  const handleDislike = async() => {
    await axios.put(`/api/users/unlike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id));
  }

  const handleSubscribe = async() => {
    currentUser?.subscribedUsers?.includes(channel._id) ?
    await axios.put(`/api/users/unsub/${channel._id}`) :
    await axios.put(`/api/users/sub/${channel._id}`)
    dispatch(subscription(channel._id))
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views . {times(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? (<MdThumbUpAlt size={21} />) : (<MdOutlineThumbUpOffAlt size={21} />)} 
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>{currentVideo.disLikes?.includes(currentUser._id) ? (<IoMdThumbsDown size={21}/>) : (<MdOutlineThumbDownAlt size={21}/>)} Dislike
            </Button>
            <Button><BsFillReplyFill /> Share</Button>
            <Button><MdAddTask /> Save</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img}/>
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
            <Subscribe onClick={handleSubscribe}>{currentUser.subscribedUsers?.includes(channel._id) ? " SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
      <Recommandation tags={currentVideo.tags} />
    </Container>
  )
}

export default Video

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 10px 20px;
`
const Content = styled.div`
  flex: 5;
`


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  @media (max-width: 500px){
    flex-wrap: wrap;
  }
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const Image = styled.img`
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`
const ChannelName = styled.div`
  font-weight: 500;
`
const ChannelCounter = styled.div`
  color: ${({theme}) => theme.text};
  font-size: 12px;
`

const Description = styled.p`
  font-size: 14px;
`
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 auto;
`
const VideoWrapper = styled.div`
   @media (max-width: 600px) {
    iframe {
      height: 300px;
    }
`
const Title = styled.h1`
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`
const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

`
const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
  margin: 7px 0;
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`
const Hr = styled.div`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`
const VideoFrame = styled.video`
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  @media(max-width: 600px){
    max-height: 280px;
  }
`