import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';


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

function Card({type, eachVideo}) {
    const[channel, setChannel] = useState({});
    if(eachVideo?.userId){
        useEffect(() => {
            const fetchChannel = async () => {
                const res = await axios.get(`api/users/find/${eachVideo?.userId}`);
                setChannel(res.data);
                // console.log(res.data);
            }
            fetchChannel();
        }, [eachVideo.userId])
    }
    
  return (
    <Link to={`/video/${eachVideo._id}`} style={{textDecoration: 'none'}}>
        <Container type={type}>
            <Image type={type} src={eachVideo.imgUrl} />
            <Detail type={type}>
                <ChannelImage type={type} src={channel.img} />
                <Text>
                    <Title>{eachVideo.title}</Title>
                    <ChannelName>{channel.name}</ChannelName>

                    <Info>{eachVideo.views} views • {times(eachVideo.createdAt)}</Info>
                </Text>
            </Detail>
        </Container>
    </Link>
  )
}

export default Card

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "270px"};
    margin-bottom: ${(props) => props.type === "sm" ? "10px" : "40px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    flex-direction: column;
    gap: 10px;
`

const Image = styled.img`
    height: ${(props) => props.type === "sm" ? "120px" : "180px"};
    width: 100%;
    background-color: #999;
    flex: 1;
`
const Detail = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
`
const Text = styled.div`
    margin-left: 5px;
`
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`
const ChannelName = styled.h2`
    font-size: 14px;
     color: ${({theme}) => theme.textSoft};
     margin: 9px 0;
`
const Info = styled.div`
    font-size: 14px;
     color: ${({theme}) => theme.textSoft};
`