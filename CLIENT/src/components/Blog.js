import React from 'react';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
  } from "@mui/material";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div><Card sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>

{isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="success" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}

    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "steelblue" }} aria-label="recipe">
          {userName ? userName.charAt(0) : ""}
        </Avatar>
      }
      
      title={title}
      subheader="August 23, 2022"
      
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <CardContent>
    <hr />
    <br />
      <Typography variant="body2" color="black">
      <b>{userName}</b> {": "} {description}
      </Typography>
    </CardContent>
    
  </Card></div>
  )
}

export default Blog