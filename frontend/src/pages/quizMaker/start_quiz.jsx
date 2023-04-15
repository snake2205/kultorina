import { socket } from './socket';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Start_Quiz() {
    const [socketIo, setSocketIo] = useState()
    const { state } = useLocation();
    const [slide, setSlide] = useState();
    const [run, setRun] = useState(false);
    const [timer, setTimer] = useState();
    useEffect(() => {
        socket.emit("setup", state.id);
        socket.on("connect", () => { console.log(socket.id) });
        socket.on("news", (data) => { console.log(data, socket.connected); });
        socket.on("quiz_end", () => { setSlide(<End />); });
        socket.on("count_down_quiz", (data) => { setSlide(<QuizSlide inputField={data.data} timer={data.time} />); console.log(data.data) });
        socket.on("count_down_break", (data) => {setSlide(<Break timer={data.time} inputField={ data.data } />); });
        setSocketIo(socket)

        return () => {
            socket.off("connect");
            socket.off("news");
            socket.off("message");
            socket.off("count_down_quiz");
            socket.off("count_down_break");
        }
    },[])

    const startQuiz = () => {
        socket.emit("start_quiz");  
        setRun(true);
    }

    var component = run === false ?
        <Button
            startQuiz={startQuiz}
        /> :
        slide;

    return (
        <div className="row flex-grow-1 d-flex">
                { component }
        </div>
    )
}

export default Start_Quiz;

function QuizSlide({ inputField, timer }) {
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        let data = [inputField.answer, inputField.fake2, inputField.fake3, inputField.fake1];
        let index = data.length,
            randomIndex;
        console.log(data);
        while (index != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * index);
            index--;
            // And swap it with the current element.
            [data[index], data[randomIndex]] = [data[randomIndex], data[index]];
        }
        setAnswers(data);
    }, [])

    return (
        <>
            <div className="row m-0">
                <div className="col-2"></div>
                <div className="col-8 text-center my-auto">
                    <img className="img-fluid" style={{ maxHeight: "300px"}} src={inputField.image}></img>
                </div>
                <div className="col-2 my-auto text-center"> <h1>{timer}</h1> </div>
            </div>
            <div className="row m-0 pb-5">
                <div className="bg-white">
                    <div className="row h-100 flex-grow-1">
                        <h1 className="text-center">Kur atrodas vieta?</h1>
                        <div className="col-6">
                            <button className="btn btn-danger w-100 my-1 h-50">{ answers[0] }</button>
                            <button className="btn btn-success w-100 my-1 h-50">{answers[1]}</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-warning w-100 my-1 h-50">{answers[2]}</button>
                            <button className="btn btn-primary w-100 my-1 h-50">{answers[3]}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Button({ startQuiz }) {

    return (
        <div className="col-12 text-center my-auto">
        <button className="btn btn-lg btn-danger" type="button" onClick={() => startQuiz()}>start</button>
        </div>
            );
}

function Break({ inputField, timer }) {
    return (
        <>
            <div className="row m-0">
                <div className="col-8 text-center my-auto mx-auto">
                    <img className="img-fluid" style={{ maxHeight: "300px" }} src={inputField.image}></img>
                    <h1 className="text-center">Kur atrodas vieta?</h1>
                    <h1>{timer}</h1>
                </div>
            </div>
        </>
    )
}

function End() {
    return (
        <>
            <div className="row m-0">
                <div className="col text-center my-auto mx-auto">
                    <h1>Viktorina beigusies</h1>
                </div>
            </div>
        </>
    )
}