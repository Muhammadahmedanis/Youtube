import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from '../components/Card';

function Search() {
    const[videos, setVideos] = useState();
    const query = useLocation().search
    useEffect(() => {
        const fetchVideo = async function () {
        try {
            const res = await axios.get(`/api/videos/search${query}`)
            console.log(res.data);
            setVideos(res.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchVideo();
    }, [])
    
  return (
    <Container>
        {videos?.map(eachVideo => (
            <Card key={eachVideo._id} eachVideo={eachVideo} />
        ))}
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`

export default Search