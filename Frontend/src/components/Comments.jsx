import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

function Comments() {
  return (
    <Container>
       <NewComment>
            <Avavatr src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
            <Input placeholder='Add a comment...' />
        </NewComment> 
        <Comment />
        <Comment />  
        <Comment />  
        <Comment />  
        <Comment />  

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
    width: 50px;
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