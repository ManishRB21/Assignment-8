import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const labelStyles = { mb: 1, mt: 1, fontSize: "20px", fontWeight: "bold" };
const AddBlog = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: "",
      });
      const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
      };

      const sendRequest = async () => {
        const res = await axios
          .post("http://localhost:5000/api/blog/add", {
            title: inputs.title,
            description: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userId"),
          })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
        .then((data) => console.log(data))
        .then(() => navigate("/blogs"));
      };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor={"#01579b"}
        
        borderRadius={10}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={"auto"}
        marginTop={3}
        marginBottom={0}
        display="flex"
        flexDirection={"column"}
        width={"80%"}
      >
        <Typography
          
          fontWeight={"bold"}
          fontSize={40}
          padding={0}
          color="grey"
          variant="h2"
          textAlign={"center"}
        >
          ADD BLOG
        </Typography>
        <InputLabel  sx={labelStyles}>
          Title
        </InputLabel>
        <TextField
          
          name="title"
          onChange={handleChange}
          value={inputs.title}
          margin="0"
          variant="outlined"
        />
        <InputLabel  sx={labelStyles}>
          Content
        </InputLabel>
        <TextField
         
         name="description"
         onChange={handleChange}
         value={inputs.description}
         margin="0"
         variant="outlined"
        />
        <InputLabel  sx={labelStyles}>
          Image Link
        </InputLabel>
        <TextField
       
       name="imageURL"
       onChange={handleChange}
       value={inputs.imageURL}
       margin="auto"
       variant="outlined"
        />
        <Button
          sx={{ mt: 2, borderRadius: 4 }}
          variant="contained"
          color="info"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  </div>
  );
};

export default AddBlog;