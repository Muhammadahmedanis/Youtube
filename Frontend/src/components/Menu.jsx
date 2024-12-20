import React from 'react'
import styled from 'styled-components'
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5"
import { MdOutlineMovieCreation } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinedFlag } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineSettingsBrightness } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Menu({darkMode, setDarkMode}) {
    const { currentUser } = useSelector(state => state.user);

  return (
    <Container>
        <Wrapper>
            <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
                <Logo>
                    <Img src='https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png' />
                    YouTube
                </Logo>
            </Link>
            <Item>
                <AiFillHome />
                Home
            </Item>
            <Link to="/trend" style={{textDecoration: "none", color:"inherit"}} >
                <Item>
                    <MdOutlineExplore />
                    Explore
                </Item>
            </Link>
            <Link to="/sub" style={{textDecoration: "none", color:"inherit"}} >
                <Item>
                    <MdOutlineSubscriptions />
                    Subscriptions
                </Item>
            </Link>
            <Hr />
            <Item>
                <MdOutlineVideoLibrary />
                Library
            </Item>
            <Item>
                <MdOutlineHistory />
                History
            </Item>
            <Hr/>
            { !currentUser && 
                <>
                <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Link to="/signin" style={{textDecoration: "none"}}>
                        <Button><MdOutlineAccountCircle />SIGN IN</Button>
                    </Link>
                </Login>
                <Hr />
                </>
            }
            <Title>BEST OF YOUTUBE</Title>
            <Item>
                <MdOutlineLibraryMusic />
                Music
            </Item>
            <Item>
                <MdOutlineSportsBasketball />
                Sports
            </Item>
            <Item>
                <IoGameControllerOutline />
                Gaming
            </Item>
            <Item>
                <MdOutlineMovieCreation />
                Movies
            </Item>
            <Item>
                <MdOutlineArticle />
                News
            </Item>
            <Item>
                <MdLiveTv />
                Live
            </Item>
            <Hr />
            <Item>
                <IoSettingsOutline />
                Setting
            </Item>
            <Item>
                <MdOutlinedFlag />
                Report
            </Item>
            <Item>
                <IoHelpCircleOutline />
                Help
            </Item>
            <Item onClick={() => setDarkMode(!darkMode)}>
                <MdOutlineSettingsBrightness />
                {darkMode ? "Light": "Dark"} Mode      
            </Item>
        </Wrapper>
    </Container>
  )
}

export default Menu

const Container = styled.div`
    background-color: ${({theme}) => theme.bg};
    height: 100%;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
    // width: 100%;
    @media (max-width: 525px) {
        display: none;
      }
`
const Wrapper = styled.div`
    width: 150px;
    padding: 10px 26px;
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
`
const Img = styled.img`
    height: 25px;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 6px 0;
    &:hover{
        background-color: ${({theme}) => theme.soft};
    }
`
const Hr = styled.div`
    margin: 10px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`
const Login = styled.div`
    
`
const Button = styled.button `
    padding: 8px 15px;
    background-color: transparent;
    border: 1px solid  #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 11px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`
const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 10px;
`