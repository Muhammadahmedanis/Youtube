import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card';
import axios from 'axios';

function Home({type}) {
  const[video, setVideo] = useState([]);
  useEffect(() => {
    try {
      const fetchVideo = async () => {
        const res = await axios.get(`/api/videos/${type}`);
        setVideo(res.data);
      }
      fetchVideo()
    } catch (error) {
      setVideo(error)
    }
  }, [type])
  

  return (
    <Container>
      {
        video?.map( eachVideo => (
          <Card key={eachVideo._id} eachVideo={eachVideo} />
        ))
      }
      
    </Container>
  )
}

export default Home

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 23px;
    flex-wrap: wrap;
    padding: 22px 0;
`