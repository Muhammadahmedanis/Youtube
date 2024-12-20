import React from 'react'
import styled from 'styled-components'
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineVideoCall } from "react-icons/md";

function Navbar() {
    const { currentUser } = useSelector(state => state.user);

  return (
    <Container>
        <Wrapper>
            <Search>
                <Input type="text" placeholder='Search' />
                <IoSearch />
            </Search>
           { currentUser ? ( <User> <MdOutlineVideoCall/> <Avatar src={currentUser?.img} /> {currentUser.name} </User> ) : <Link to="/signin" style={{textDecoration: "none"}}>
                <Button><MdOutlineAccountCircle />SIGN IN</Button>
            </Link>}
        </Wrapper>
    </Container>
  )
}

export default Navbar

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #999;
`

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.bgLighter};
    height: auto;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding: 20px;
    position: relative;
`
const Search = styled.div`
    width: 40%;
    // position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`
const Input = styled.input`
    border: none;
    background-color: transparent;
`
const Button = styled.button `
    padding: 7px 15px;
    background-color: transparent;
    border: 1px solid  #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`