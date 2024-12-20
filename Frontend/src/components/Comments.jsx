import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios';
import { useSelector } from 'react-redux';

function Comments({videoId}) {
  const { currentUser } = useSelector(state => state.user);
  const[comments, setComments] = useState([]);
  useEffect(() => {
    const fetComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetComments()
  }, [])
  // console.log(comments);

  return (
    <Container>
       <NewComment>
            <Avavatr src={currentUser.img}/>
            <Input placeholder='Add a comment...' />
        </NewComment> 
        {
          comments.map(comment => (
            <Comment key={comment._id} comment={comment}/>
          ))
        }
    </Container>
  )
}

export default Comments

const Container = styled.div``

const NewComment = styled.div`
  display: flex;
  align-items: cener;
  gap: 10px;
`

const Avavatr = styled.img`
    height: 50px;
    width: 110px;
    border-radius: 50%;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({theme}) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 200%;
`