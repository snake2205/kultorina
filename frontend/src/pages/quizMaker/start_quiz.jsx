import { socket } from './socket';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Start_Quiz() {
    const [socketIo, setSocketIo] = useState()
    const { state } = useLocation();
    const [run, setRun] = useState(false);
    const [players, setPlayers] = useState([]);
    const [code, setCode] = useState();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        socket.emit("setup_admin", state.id);
        socket.on("connect", () => { console.log(socket.id) });
        socket.on("start_info", (data) => { setCode(data.code); setQuestions(data.quiz); });
        setSocketIo(socket);

        return () => {
            socket.off("start_info")
            socket.off("connect");
        }
    }, [])

    useEffect(() => {
        socket.on("player_added", (data) => { if (players.length === 0) { setPlayers([{ "id": data, "points": 0,"tempPoints":0, "name": "dumbass" }]); } else { let p = [...players]; setPlayers([p, { "id": data, "points": 0, "name": "dumbass" }]); console.log(players); } });
        return () => {
            socket.off("player_added");
        }
    }, [players])

    const startQuiz = () => {
        setRun(true);
    }

    var component = run === false ?
        <Start
            code={code}
            startQuiz={startQuiz}
            players={players.length}
        /> :
        <Timer
            questions={questions}
            playerList={players}
        />

    return (
        <div className="row flex-grow-1 d-flex">
            {component}
        </div>
    )

}

export default Start_Quiz;

function Timer({questions, playerList}){
    const STATUS = {
        pause: 0,
        intro: 1,
        question: 2,
        end:3,
        default:4
    }
    const [seconds, setSeconds] = React.useState(5);
    const [status, setStatus] = React.useState(STATUS.intro);
    const intervalRef = React.useRef();
    const [index, setIndex] = useState(0);
    const pointsForAnswer = 10
    const [slide, setSlide] = useState();
    const [players, setPlayers] = useState(playerList);

    useEffect(() => {
        socket.emit("broadcast_intro");
    }, [])

    useEffect(() => {
        socket.on("check_answer", (data) => {
            if (questions[index]["options"][data["answer"] - 1] === questions[index]["answer"]) {
                let p = players;
                let i = p.findIndex(el => el.id == data.id);
                p[i].tempPoints = pointsForAnswer + seconds;
                setPlayers(p);
            } else {
                let p = players;
                let i = p.findIndex(el => el.id == data.id);
                p[i].tempPoints = 0;
                setPlayers(p);
            }
        });
        return () => {
            socket.off("check_answer");
        }
    }, [seconds, index, players])

    function countDown() {
        if (seconds === 0) {
            if (status === STATUS.intro) {
                setStatus(STATUS.question);
                setSeconds(6);
                socket.emit("broadcast_question", questions[index]["options"]);
                setSlide(< QuizSlide inputField={questions[index]} timer={seconds} />)
            } else {
                if (index === questions.length - 1) {
                    setStatus(STATUS.end)
                    let p = players;
                    p.forEach((el) => {
                        el.points += el.tempPoints;
                        el.tempPoints = 0;
                        console.log(el);
                        socket.emit("return_points", { "points": el.points, "id": el.id });
                    })
                    const sorted = p.sort(
                        function (a, b) {
                            return parseFloat(b['points']) - parseFloat(a['points']);
                        })
                    if (sorted.length < 3) {
                        sorted.push({ name: "", points: ""}, { name: "", points: ""})
                    }
                    setPlayers(sorted);
                    socket.emit("broadcast_end");
                    setSlide(< End />)

                } else {
                    setStatus(STATUS.intro);
                    setSlide(< Break inputField={questions[index]} timer={seconds} />)
                    setSeconds(5);
                    setIndex(index + 1);
                    let p = players;
                    p.forEach((el) => {
                        el.points += el.tempPoints;
                        el.tempPoints = 0;
                        console.log(el);
                        socket.emit("return_points", { "points": el.points, "id": el.id });
                    })
                    const sorted = p.sort(
                        function (a, b) {
                            return parseFloat(b['points']) - parseFloat(a['points']);
                        })

                    setPlayers(sorted);
                    socket.emit("broadcast_intro");
                }
            }
        } else {
            setSeconds(sec => sec - 1);
        }
    }

    React.useEffect(() => {
        if (status === STATUS.intro || status ===STATUS.question) {
            intervalRef.current = setInterval(() => {
                countDown()
            }, 1000);
        } else if (status === STATUS.pause && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [seconds, status]);

    var component = status === STATUS.intro ?
        <Break
            inputField={questions[index]}
            timer={seconds}
        /> :
    status === STATUS.question ?
        <QuizSlide
            inputField={questions[index]}
            timer={seconds }
         /> :
        <End
            players={players }
        />
        

    return (
        <div className="row flex-grow-1 d-flex">
            { component }
        </div>
    );
}

function QuizSlide({ inputField, timer }) {
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
                <div className="row h-100 flex-grow-1">
                    <h1 className="text-center">Kur atrodas vieta?</h1>
                    <div className="col-6">
                        <button className="btn btn-danger w-100 my-1 h-50">{ inputField.options[0] }</button>
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
        <h1>{ code }</h1>
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

function End({ players }) {

    return (
        <>
            <div className="row m-0">
                <div className="col text-center my-auto mx-auto">
                    <h1>Viktorina beigusies</h1>
                    <ul>
                        <h1>1. {players[0].name}  {players[0].points}</h1>
                        <h1>2. {players[1].name}  {players[1].points}</h1>
                        <h1>3. {players[2].name}  {players[2].points}</h1>
                    </ul>
                </div>
            </div>
        </>
    )
}