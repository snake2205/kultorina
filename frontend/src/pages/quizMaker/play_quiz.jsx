import { socket } from './socket';
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
    const [submitAnswer, setSubmitAnswer] = useState(0);

    useEffect(() => {
        socket.emit("setup_player", state.code);
    }, [])

    useEffect(() => {
        socket.on("send_points", (data) => { let p = points; setPoints(p + data["points"]); });
        socket.on("intro", () => { setStatus(STATUS.intro); setSlide(<Break />); socket.emit("submit_answer", submitAnswer); console.log(submitAnswer); setSubmitAnswer(0); });
        socket.on("answers", (data) => {
            setStatus(STATUS.question); setAnswers(data); setSlide(<QuizSlide inputField={data} SubmitAnswer={setSubmitAnswer} />); console.log(data); });
        socket.on("end", () => {setStatus(STATUS.end); setSlide(<EndSlide points={ points } />)});
        return () => {
            socket.off("send_points");
            socket.off("intro");
            socket.off("answers");
            socket.off("end");
        }
    }, [submitAnswer, points, slide, answers])

    /*var component = status === STATUS.intro ?
        <Break /> :
            status === STATUS.question ?
        <QuizSlide
                inputField={answers}
                SubmitAnswer={ setSubmitAnswer }
        /> :
            <p>asd</p>*/


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

function QuizSlide({ inputField, SubmitAnswer }) {

    return (
        <>
            <div className="row m-0 pb-5">
                <div className="row h-100 flex-grow-1">
                    <div className="col-6">
                        <button className="btn btn-danger w-100 my-1 h-50" onClick={() => SubmitAnswer(1)}>{inputField[0]}</button>
                        <button className="btn btn-success w-100 my-1 h-50" onClick={() => SubmitAnswer(2)}>{inputField[1]}</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-warning w-100 my-1 h-50" onClick={() => SubmitAnswer(3)}>{inputField[2]}</button>
                        <button className="btn btn-primary w-100 my-1 h-50" onClick={() => SubmitAnswer(4)}>{inputField[3]}</button>
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
