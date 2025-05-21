import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [time, setTime] = useState("");
  const [useForm, setUseForm] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/quiz', {state : {question, time}});
  }
  return (
    <Box>
      <Button
        onClick={() => {
          setUseForm(true);
        }}
        sx={{margin: "2px"}}
        variant="contained"
      >
        CREATE QUIZ
      </Button>
      {useForm && 
        <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      <TextField
        label="Enter a number (1-20)"
        type="number"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        inputProps={{min: 1, max: 20 }}
        required
      />
      <TextField
        label="Enter a number (1-60)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        inputProps={{ min: 1, max: 60 }}
        required
      />
      <Button type="submit" variant="contained" >Submit</Button>
    </Box> 
      }
    </Box>
  );
}
