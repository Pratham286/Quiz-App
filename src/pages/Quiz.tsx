import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Question from '../components/Question';
import { Box, Typography } from '@mui/material';


export default function Quiz() {
  const location = useLocation();
  const [rightAnswer, setRightAnswer] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [questionIndex, setQuestionIndex] =useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  // const { questions, time } = location.state || {};
  // console.log("time" ,{time} + "question", {questions})
  const questions = location.state.question;
  const time = location.state.time;
  const totalAvailable = 20;
  // const availableIndexes = Array.from({ length: totalAvailable }, (_, i) => i);
  // const shuffled = availableIndexes.sort(() => 0.5 - Math.random());
  // const selectedIndexes = shuffled.slice(0, questions);
  const selectedIndexes = useMemo(() => {
    const availableIndexes = Array.from({ length: totalAvailable }, (_, i) => i);
    const shuffled = availableIndexes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, questions);
  }, []); // empty dependency array = run once

  

  const handleCorrect = (isCorrect : boolean)=>{
    if(isCorrect)
    {
      setRightAnswer((prev) => prev +1);
    }
    setTotalAnswer((prev) => prev + 1);
    setIsAnswered(true);
    // setQuestionIndex((prev) => prev + 1);
  }
  
  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsAnswered(false);
  } 
  // console.log({location})
  return (
    // <div>
    //   {/* {time} */}
    //   {/* {questions} */}
    //   <Question index={1} num={1}/>
    // </div>


    // <div>
    //   <Box>

    //   <Box>
    //   {rightAnswer}
    //   </Box>
    //   {selectedIndexes.map((index, i) => (
    //     <Question key={i} index={index} num={i + 1} onCorrect={handleCorrect}/>
    //   ))}
    //   </Box>
    // </div>


    <Box>
      <Box>
        <Typography>Score: {rightAnswer}/{totalAnswer}</Typography>
      </Box>

      {questionIndex < selectedIndexes.length ? (
        <Question
          index={selectedIndexes[questionIndex]}
          num={questionIndex + 1}
          onCorrect={handleCorrect}
          isAnswered= {isAnswered}
          onNext={handleNext}
        />
      ) : (
        <Typography>Quiz Completed!</Typography>
      )}
    </Box>
  )
}


