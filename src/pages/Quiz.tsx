// import React, { useEffect, useMemo, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import Question from '../components/Question';
// import { Box, Typography } from '@mui/material';


// export default function Quiz() {
//   const location = useLocation();
//   const [rightAnswer, setRightAnswer] = useState(0);
//   const [totalAnswer, setTotalAnswer] = useState(0);
//   const [questionIndex, setQuestionIndex] =useState(0);
//   const [isAnswered, setIsAnswered] = useState(false);
//   // const { questions, time } = location.state || {};
//   // console.log("time" ,{time} + "question", {questions})
//   const questions = location.state.question;
//   const time = location.state.time;
//   const totalAvailable = 20;
//   // const availableIndexes = Array.from({ length: totalAvailable }, (_, i) => i);
//   // const shuffled = availableIndexes.sort(() => 0.5 - Math.random());
//   // const selectedIndexes = shuffled.slice(0, questions);
//   const selectedIndexes = useMemo(() => {
//     const availableIndexes = Array.from({ length: totalAvailable }, (_, i) => i);
//     const shuffled = availableIndexes.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, questions);
//   }, []); // empty dependency array = run once

  
//   const [seconds, setSeconds] = useState(time*60);
//   if(seconds>0 && questionIndex < questions)
//   {

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setSeconds(prev => prev - 1);
//       }, 1000);
      
//       // Cleanup on unmount
//       return () => clearInterval(interval);
//     }, []);
//   }
//   else{
//     useEffect(()=>{
//       setSeconds(0);
//     })
//   }

//   const handleCorrect = (isCorrect : boolean)=>{
//     if(isCorrect)
//     {
//       setRightAnswer((prev) => prev +1);
//     }
//     setTotalAnswer((prev) => prev + 1);
//     setIsAnswered(true);
//     // setQuestionIndex((prev) => prev + 1);
//   }
  
//   const handleNext = () => {
//     setQuestionIndex((prev) => prev + 1);
//     setIsAnswered(false);
//   } 
//   // console.log({location})
//   return (
//     <Box>
//       <Box>
//         <Typography sx={{}}>Time left: {Math.floor(seconds/60)}:{seconds%60} </Typography>
//         <Typography>Score: {rightAnswer}/{totalAnswer}</Typography>
//       </Box>

//       {seconds>0 && questionIndex < selectedIndexes.length ? (
//         <Question
//           index={selectedIndexes[questionIndex]}
//           num={questionIndex + 1}
//           onCorrect={handleCorrect}
//           isAnswered= {isAnswered}
//           onNext={handleNext}
//         />
//       ) : (
//         <Typography>Quiz Completed!</Typography>
//       )}
//     </Box>
//   )
// }


import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Question from '../components/Question';
import { Box, Typography, Card, CardContent, LinearProgress } from '@mui/material';

export default function Quiz() {
  const location = useLocation();
  const [rightAnswer, setRightAnswer] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = location.state.question;
  const time = location.state.time;
  const totalAvailable = 20;

  const selectedIndexes = useMemo(() => {
    const availableIndexes = Array.from({ length: totalAvailable }, (_, i) => i);
    const shuffled = availableIndexes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, questions);
  }, []);

  const [seconds, setSeconds] = useState(time * 60);

  useEffect(() => {
    if (seconds > 0 && questionIndex < questions) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, questionIndex, questions]);

  const handleCorrect = (isCorrect: boolean) => {
    if (isCorrect) {
      setRightAnswer((prev) => prev + 1);
    }
    setTotalAnswer((prev) => prev + 1);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsAnswered(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const progress = ((questions - (selectedIndexes.length - questionIndex)) / questions) * 100;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, px: 2 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
              Time Left: {`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
            </Typography>
            <Typography variant="h6" color="secondary">
              Score: {rightAnswer}/{totalAnswer}
            </Typography>
          </Box>

          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, mb: 3 }} />

          {seconds > 0 && questionIndex < selectedIndexes.length ? (
            <Question
              index={selectedIndexes[questionIndex]}
              num={questionIndex + 1}
              onCorrect={handleCorrect}
              isAnswered={isAnswered}
              onNext={handleNext}
            />
          ) : (
            <Typography variant="h5" color="success.main" align="center" mt={4}>
              🎉 Quiz Completed!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
