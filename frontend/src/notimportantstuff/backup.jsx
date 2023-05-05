import { socket } from './socket';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Start_Quiz() {
    const [socketIo, setSocketIo] = useState()
    const { state } = useLocation();
    const [slide, setSlide] = useState();
    const [run, setRun] = useState(false);
    const [players, setPlayers] = useState(0);
    const [code, setCode] = useState();
    useEffect(() => {
        socket.emit("setup_admin", state.id);
        socket.on("connect", () => { console.log(socket.id) });
        socket.on("start_info", (data) => { setCode(data); console.log(data) });
        socket.on("news", (data) => { console.log(data, socket.connected); });
        socket.on("quiz_end", () => { setSlide(<End />); });
        socket.on("count_down_quiz", (data) => { setSlide(<QuizSlide inputField={data.data} timer={data.time} />); console.log(data.data) });
        socket.on("count_down_break", (data) => { setSlide(<Break timer={data.time} inputField={data.data} />); });
        setSocketIo(socket);

        return () => {
            socket.off("start_info")
            socket.off("connect");
            socket.off("news");
            socket.off("message");
            socket.off("count_down_quiz");
            socket.off("count_down_break");
            socket.off("player_added");
        }
    }, [])

    useEffect(() => {
        socket.on("player_added", () => { var p = players; setPlayers(p + 1); console.log(players); });
        return () => {
            socket.off("player_added");
        }
    }, [players])

    const startQuiz = () => {
        socket.emit("start_quiz_admin");
        setRun(true);
    }

    var component = run === false ?
        <Start
            code={code}
            startQuiz={startQuiz}
            players={players}
        /> :
        slide;

    return (
        <div className="row flex-grow-1 d-flex">
            {component}
        </div>
    )
}

export default Start_Quiz;

function QuizSlide({ inputField, timer }) {
    return (
        <>
            <div className="row m-0">
                <div className="col-2"></div>
                <div className="col-8 text-center my-auto">
                    <img className="img-fluid" style={{ maxHeight: "300px" }} src={inputField.image}></img>
                </div>
                <div className="col-2 my-auto text-center"> <h1>{timer}</h1> </div>
            </div>
            <div className="row m-0 pb-5">
                <div className="row h-100 flex-grow-1">
                    <h1 className="text-center">Kur atrodas vieta?</h1>
                    <div className="col-6">
                        <button className="btn btn-danger w-100 my-1 h-50">{inputField.options[0]}</button>
                        <button className="btn btn-success w-100 my-1 h-50">{inputField.options[1]}</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-warning w-100 my-1 h-50">{inputField.options[2]}</button>
                        <button className="btn btn-primary w-100 my-1 h-50">{inputField.options[3]}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function Start({ code, startQuiz, players }) {

    return (
        <div className="col-12 text-center my-auto">
            <h1>{code}</h1>
            <button className="btn btn-lg btn-danger" type="button" onClick={() => startQuiz()}>start</button>
            <h2>{players}</h2>
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


    import { socket } from './socket';
    import React, { useState, useEffect } from 'react';
    import { useLocation } from 'react-router-dom';

    function Start_Quiz() {
        const [socketIo, setSocketIo] = useState()
        const { state } = useLocation();
        const [slide, setSlide] = useState();
        useEffect(() => {
            socket.emit("setup_player", state.code);
            setSocketIo(socket)
            socket.on("count_down_quiz", (data) => { setSlide(<QuizSlide inputField={data.data} timer={data.time} />); });
            socket.on("count_down_break", (data) => { setSlide(<Break timer={data.time} />); });

            return () => {
                socket.off("count_down_break");
                socket.off("count_down_quiz");
            }
        }, [])


        return (
            <div className="row flex-grow-1 d-flex">
                {slide}
            </div>
        )
    }

    export default Start_Quiz;

    function Break({ timer }) {
        return (
            <>
                <div className="row m-0">
                    <div className="col-8 text-center my-auto mx-auto">
                        <h1>{timer}</h1>
                    </div>
                </div>
            </>
        )
    }

    function QuizSlide({ inputField, timer }) {
        const SubmitAnswer = (answer) => {
            socket.emit("submit_answer", answer, timer);
        }

        return (
            <>
                <div className="row m-0 pb-5">
                    <div className="row h-100 flex-grow-1">
                        <div className="col-6">
                            <button className="btn btn-danger w-100 my-1 h-50" onClick={() => SubmitAnswer(1)}>{inputField.options[0]}</button>
                            <button className="btn btn-success w-100 my-1 h-50" onClick={() => SubmitAnswer(2)}>{inputField.options[1]}</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-warning w-100 my-1 h-50" onClick={() => SubmitAnswer(3)}>{inputField.options[2]}</button>
                            <button className="btn btn-primary w-100 my-1 h-50" onClick={() => SubmitAnswer(4)}>{inputField.options[3]}</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}