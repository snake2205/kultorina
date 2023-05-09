import  GetSocket  from './socket';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Start_Quiz() {
    const STATUS = {
        pause: 0,
        intro: 1,
        end:2,
        question: 3
    }
    const { state } = useLocation();
    const [slide, setSlide] = useState();
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState(STATUS.intro);
    const [points, setPoints] = useState(0);
    const [socket, setSocket] = useState(GetSocket());


    useEffect(() => {
        socket.emit("setup_player", { code:state.code, name:state.name });
    }, [])

    useEffect(() => {
        socket.on("send_points", (data) => { setPoints(data.points); });
        socket.on("intro", () => { setStatus(STATUS.intro); setSlide(<Break />); console.log(0);});
        socket.on("answers", (data) => {
            setStatus(STATUS.question); setAnswers(data); setSlide(<QuizSlide inputField={data} socket={ socket } />); console.log(data); });
        socket.on("end", () => {setStatus(STATUS.end); setSlide(<EndSlide points={ points } />)});
        return () => {
            socket.off("send_points");
            socket.off("intro");
            socket.off("answers");
            socket.off("end");
        }
    }, [points, slide, answers, socket])

    return (
        <div className="row flex-grow-1 d-flex">
            {slide}
        </div>
    )
}

export default Start_Quiz;

function Break() {
    return (
        <>
            <div className="row m-0">
                <div className="col-8 text-center my-auto mx-auto">
                    <p>tlt bus opcijas</p>
                </div>
            </div>
        </>
    )
}

function QuizSlide({ inputField, socket }) {
    const [submitAnswer, setSubmitAnswer] = useState(0);
    const SubmitAnswer = (answer) => {
        if (submitAnswer != answer) {
            setSubmitAnswer(answer);
            socket.emit("submit_answer", answer);
        }
    }   
    return (
        <>
            <div className="row m-0">
                <div className="row h-100 flex-grow-1 g-0">
                    <div className="col-6">
                        <button className="k-btn k-red w-100 h-50" onClick={() => SubmitAnswer(1)}>{inputField[0]}</button>
                        <button className="k-btn k-green w-100 h-50" onClick={() => SubmitAnswer(2)}>{inputField[1]}</button>
                    </div>
                    <div className="col-6">
                        <button className="k-btn k-blue w-100 h-50" onClick={() => SubmitAnswer(3)}>{inputField[2]}</button>
                        <button className="k-btn k-yellow w-100 h-50" onClick={() => SubmitAnswer(4)}>{inputField[3]}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function EndSlide({ points }) {

    return (
        <>
            <div className="row m-0">
                <div className="col-8 text-center my-auto mx-auto">
                    <p>points: { points }</p>
                </div>
            </div>
        </>
    )
}
