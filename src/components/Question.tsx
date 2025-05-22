import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import { Questions } from "./QuestionList";
import { green, red, grey } from "@mui/material/colors";

type props = {
  index: number;
  num: number;
  onCorrect: (isCorrect: boolean) => void;
  isAnswered: boolean;
  onNext: () => void;
};

export default function Question({
  index,
  num,
  onCorrect,
  isAnswered,
  onNext,
}: props) {
  const answer = Questions[index].correctAnswer;
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = (selected: string) => {
    setSelectedOption(selected);
    const correct = selected === answer;
    setIsCorrect(correct);
    onCorrect(correct);
  };

  let content = (
    <Box textAlign="center" mt={2}>
      <Typography
        sx={{
          bgcolor: isCorrect ? green[500] : red[500],
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 1,
          width: "fit-content",
          mx: "auto",
          fontWeight: "bold",
        }}
      >
        {isCorrect ? "Right Answer!" : "Wrong Answer!"}
      </Typography>
      <Button
        onClick={onNext}
        sx={{ mt: 2, bgcolor: grey[800], color: "white", '&:hover': { bgcolor: grey[700] } }}
        variant="contained"
      >
        Next
      </Button>
    </Box>
  );

  return (
    <Paper elevation={4} sx={{ p: 3, mt: 4, mx: "auto", maxWidth: 600, mb: 2 }}>
      {!isAnswered ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Question {num}:
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {Questions[index].question}
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {Questions[index].options.map((opt) => (
              <Button
                key={opt}
                variant="outlined"
                onClick={() => handleClick(opt)}
                sx={{
                  borderColor: selectedOption === opt ? grey[900] : grey[500],
                  color: selectedOption === opt ? "white" : "black",
                  bgcolor: selectedOption === opt ? grey[800] : "white",
                  "&:hover": {
                    bgcolor: grey[200],
                  },
                }}
              >
                {opt}
              </Button>
            ))}
          </Box>
        </Box>
      ) : (
        content
      )}
    </Paper>
  );
}
