import React from 'react'
import styled from 'styled-components'

function Comment() {
  return (
    <Container>
        <Avavatr src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
        <Deatils>
            <Name>John Doe <Date>1 day ago</Date></Name>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam similique, sapiente earum, enim totam voluptate, ex ullam quas molestiae hic repudiandae dolores</Text>
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
