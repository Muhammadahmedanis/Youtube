import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import styled from 'styled-components';

function Recommandation({tags}) {
    const[videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
        try {
                const res = await axios.get(`/api/videos/tags?tags=${tags}`)
                setVideos(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchVideos();
    }, [tags]);
    
  return (
    <Container>
        {videos.map(eachVideo => (
            <Card type="sm" key={eachVideo._id} eachVideo={eachVideo} />
        ))}
    </Container>
  )
}
  
const Container = styled.div`
  flex: 2;
`

export default Recommandation