import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Questions } from './QuestionList'

type props={
    index: number,
    num: number,
    onCorrect: (isCorrect : boolean) => void,
    isAnswered: boolean,
    onNext: () => void,
};
export default function Question({index, num, onCorrect, isAnswered, onNext} : props) {
    // const i=index;
    const answer=Questions[index].correctAnswer;
    const [isCorrect, setIsCorrrect] = useState(false);
    const handleClick = (selected : string) => {
        if(selected===answer)
        {
            setIsCorrrect(true);
            onCorrect(true);
        }
        else{
            setIsCorrrect(false);
            onCorrect(false);
        }
    }
    let content;
    if(isCorrect)
    {   
        content= 
        <Box>
            <Typography>Right Answer!!!</Typography>
            <Button onClick={()=> {onNext();}}>Next</Button>
        </Box>
    }
    else{
        content= 
        <Box>
            <Typography>Wrong Answer!!!</Typography>
            <Button onClick={()=> {onNext();}}>Next</Button>
        </Box>
    }
  return (
    <Box>
        {isAnswered===false ? (
        <Box>

            <Box>
            Question {num}:- {Questions[index].question}
            </Box>
            <Box>
            <Button onClick={() => handleClick(Questions[index].options[0])}>{Questions[index].options[0]}</Button>
            <Button onClick={() => handleClick(Questions[index].options[1])}>{Questions[index].options[1]}</Button>
            <Button onClick={() => handleClick(Questions[index].options[2])}>{Questions[index].options[2]}</Button>
            <Button onClick={() => handleClick(Questions[index].options[3])}>{Questions[index].options[3]}</Button>
            </Box>
        </Box>
        ):(
            <Box>
                {content}   
            </Box>
        )}
    </Box>
  )
}
