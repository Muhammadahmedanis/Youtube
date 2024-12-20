import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const reducers = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_PROGRESS":
      return { ...state, [action.fileType]: action.progress };
    case "SET_URL":
      return { ...state, [action.urlType]: action.url };
    default:
      return state;
  }
};

function Upload({ setOpen }) {
  const initialState = {
    video: null,
    img: null,
    imgPercent: 0,
    videoPercent: 0,
    title: "",
    desc: "",
    tags: [],
    imgUrl: "",
    videoUrl: "",
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const uploadFile = (file, fileType, urlType) => {
    if (!file) return;
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `Files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: "SET_PROGRESS", fileType, progress: Math.round(progress) });
      },
      (error) => {
        console.error(`Error uploading ${fileType}:`, error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch({ type: "SET_URL", urlType, url: downloadURL });
      }
    );
  };

  const handleClick = async () => {
    if (!state.imgUrl || !state.videoUrl) {
      alert("Please wait until all files are uploaded.");
      return;
    }

    const payload = {
      title: state?.title,
      desc: state?.desc,
      tags: state?.tags,
      imgUrl: state?.imgUrl,
      videoUrl: state?.videoUrl,
    };
    console.log(payload);
    // return;
    try {
      const res = await axios.post("/api/videos", payload);
      setOpen(false);
      if (res.status === 200) {
        navigate(`/video/${res.data._id}`);
      }
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  };

  useEffect(() => {
    if (state.img) uploadFile(state.img, "imgPercent", "imgUrl");
  }, [state.img]);

  useEffect(() => {
    if (state.video) uploadFile(state.video, "videoPercent", "videoUrl");
  }, [state.video]);

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>
          <IoClose size={25} />
        </Close>
        <Title>Upload a New Video</Title>

        <Label>Video:</Label>
        {state.videoPercent > 0 ? (
          <Progress>{`Uploading Video: ${state.videoPercent}%`}</Progress>
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleChange("video", e.target.files[0])}
          />
        )}

        <Input
          type="text"
          placeholder="Title"
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Desc
          placeholder="Description"
          rows={8}
          onChange={(e) => handleChange("desc", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas"
          onChange={(e) => handleChange("tags", e.target.value.split(","))}
        />

        <Label>Image:</Label>
        {state.imgPercent > 0  ? (
          <Progress>{`Uploading Image: ${state.imgPercent}%`}</Progress>
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("img", e.target.files[0])}
          />
        )}

        <Button onClick={handleClick}>Upload</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Progress = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
