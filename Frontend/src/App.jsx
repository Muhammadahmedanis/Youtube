import './App.css'
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home';
import Video from './pages/Video';
import Signin from './pages/Signin';
import Search from './pages/Search';

function App() {
  const[darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
      <BrowserRouter>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main>
        <Navbar />
        <Wrapper>
          <Routes>
            {/* <Route path="/" /> */}
            <Route path="/" element={<Home type="random" />} />
            <Route path="trend" element={<Home type="trend" />} />
            <Route path="sub" element={<Home type="sub" />} />
            <Route path="search" element={<Search />} />
            <Route path='signin' element={<Signin />}/>
            <Route path="video">
              <Route path=":id"element={<Video />} />
            </Route>
          </Routes>
        </Wrapper>
      </Main>
      </BrowserRouter>
    </Container>
    </ThemeProvider>
  )
}

export default App

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({theme}) => theme.bg};
`

const Main = styled.div`
  width: 100%;
`

const Wrapper = styled.div`
    // padding: 22px;
`