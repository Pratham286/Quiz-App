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
      <Box sx={{display:"flex", flexDirection: "row", justifyContent: "center"}}>

      <Button
        onClick={() => {
          setUseForm(true);
        }}
        sx={{margin: "2px", width: "150px"} }
        variant="contained"
        >
        CREATE QUIZ
      </Button>
      </Box>
      {useForm && 
      <Box>
        <Box
      component="form"
      // onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center"}}
    >
      <TextField
        label="Number of Questions (1-20)"
        type="number"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        inputProps={{min: 1, max: 20 }}
        required
        sx={{margin : "3px", width: "300px"}}
        />
      <TextField
        label="Total Time in Minutes (1-60)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        inputProps={{ min: 1, max: 60 }}
        required
        sx={{margin : "3px", width: "300px"}}
      />
    </Box> 
    <Box sx={{display:"flex", flexDirection: "row", justifyContent: "center", margin: "4px"}}>
      <Button sx={{margin: "2px", width: "120px"}} variant="contained" onClick={handleSubmit}>Start Quiz</Button>
      <Button onClick={()=> setUseForm(false)} sx={{margin: "2px", width: "100px"}} variant="contained" >Cancel</Button>
    </Box>
    </Box>
      }
    </Box>
  );
}
