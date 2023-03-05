import './question.css';
import { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import axios from "axios";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

function Question() {

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionId, setQuestionId] = useState("AreaUnderTheCurve_901");   
    
    useEffect(() => {
        const getQuestionDetails = async () => {
            try {
              setLoading(true);
              const response = await axios.get(
                `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`
              );
              setQuestion(response.data[0].Question);
              setLoading(false);
            } catch (error) {
              setError(error);
              setLoading(false);
            }
        };
        getQuestionDetails();
    }, [questionId]);

    const handlePrevClick = () => {
        if (questionId === "DifferentialCalculus2_901") {
          setQuestionId("BinomialTheorem_901");
        } else if (questionId === "BinomialTheorem_901") {
          setQuestionId("AreaUnderTheCurve_901");
        }
      };
    
      const handleNextClick = () => {
        if (questionId === "AreaUnderTheCurve_901") {
          setQuestionId("BinomialTheorem_901");
        } else if (questionId === "BinomialTheorem_901") {
          setQuestionId("DifferentialCalculus2_901");
        }
      };
      
  return (
    <div className='questions'>
        <h1>Question</h1>
      <div className="questionBlock">
        {loading ?
            <CircularProgress color="success" /> 
            : error ? (
            <p>Something went wrong! Please try again later...</p>
        ) : (
            <div>
            <MathJaxContext>
                <MathJax>{question}</MathJax>
            </MathJaxContext>
            </div>
        )}
      </div>
      <div className="buttons">
        <button className='btn' onClick={handlePrevClick}><ArrowBackIcon/>Previous</button>
        <button className='btn' onClick={handleNextClick}>Next<ArrowForwardIcon/></button>
      </div>
    </div>
  )
}

export default Question