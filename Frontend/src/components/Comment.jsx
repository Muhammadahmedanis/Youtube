import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Comment({comment}) {
    const[channel, setChannel] = useState([]);
    useEffect(() => {
        const fetchComment = async() => {
        try {
                const res = await axios.get(`/api/users/find/${comment.userId}`);
                setChannel(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchComment();
    }, [comment.userId])

  return (
    <Container>
        <Avavatr src={channel.img}/>
        <Deatils>
            <Name>{channel.name}<Date>1 day ago</Date></Name>
            <Text>{comment.desc}</Text>
        </Deatils>
    </Container>
  )
}

export default Comment

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`
const Deatils = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme}) => theme.text};
`
const Name = styled.span`
    font-size: 13px;
    font-weight: 600;
`
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`
const Text = styled.span`
    font-size: 14px;
`

const Avavatr = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`
