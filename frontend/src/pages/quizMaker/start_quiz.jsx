import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../components/CSS/css.css"
import GetSocket from './socket';

function Start_Quiz() {
    const [socketIo, setSocketIo] = useState()
    const { state } = useLocation();
    const [run, setRun] = useState(false);
    const [players, setPlayers] = useState([]);
    const [code, setCode] = useState();
    const [questions, setQuestions] = useState([]);
    const [socket, setSocket] = useState(GetSocket());

    useEffect(() => {
        socket.emit("setup_admin", state.id);
        console.log(state.id);
        socket.on("connect", () => { console.log(socket.id) });
        socket.on("start_info", (data) => { setCode(data.code); setQuestions(data.quiz); console.log(data.quiz); });
        setSocketIo(socket);

        return () => {
            socket.off("start_info")
            socket.off("connect");
        }
    }, [])

    useEffect(() => {
        socket.on("player_added", (data) => { if (players.length === 0) { setPlayers([{ "id": data, "points": 0, "tempPoints": 0, "name": "dumbass" }]); } else { let p = [...players]; setPlayers([...p, { "id": data, "points": 0, "name": "dumbass" }]); console.log(players); } });
        socket.on("player_disconnect", (data) => { let p = [...players]; let i = p.findIndex(el => el.id == data); console.log(players); p.splice(i, 1); setPlayers(p); console.log(players);});
        return () => {
            socket.off("player_added");
            socket.off("player_disconnect");
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
            socket={ socket }
        />

    return (
        <div className="row flex-grow-1 d-flex">
            {component}
        </div>
    )

}

export default Start_Quiz;

function Timer({questions, playerList, socket}){
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
                setSeconds(20);
                socket.emit("broadcast_question", questions[index]["options"]);
                setSlide(< QuizSlide inputField={questions[index]} timer={seconds} />)
            } else {
                if (index === questions.length - 1) {
                    setStatus(STATUS.end)
                    let p = players;
                    p.forEach((el) => {
                        var points = el.points + el.tempPoints;
                        el.points += el.tempPoints;
                        el.tempPoints = 0;
                        console.log(el);
                        socket.emit("return_points", { "points": points, "id": el.id });
                    })
                    const sorted = p.sort(
                        function (a, b) {
                            return parseFloat(b['points']) - parseFloat(a['points']);
                        })
                    if (sorted.length < 3) {
                        sorted.push({ name: "", points: "" }, { name: "", points: "" }, { name: "", points: "" }    )
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
                    <img className="img-fluid" style={{ maxHeight: "400px"}} src={inputField.image}></img>
                </div>
                <div className="col-2 my-auto text-center"> <h1>{timer}</h1> </div>
            </div>
            <div className="row m-0 flex-grow-1">
                <div className="flex-grow-1 col-12 text-center bg-dark whitetext kahoot-container p-2">
                <div className="row">
                     <h1 className="text-center">Kur atrodas vieta?</h1>
                </div>
                <div className="row flex-grow-1 g-0 mb-2">
                    <div className="col-6 m-0">
                            <button className="k-btn k-red w-100 h-50">{ inputField.options[0] }</button>
                            <button className="k-btn k-green w-100 h-50">{inputField.options[1]}</button>
                    </div>
                    <div className="col-6">
                            <button className="k-btn k-blue w-100 h-50">{inputField.options[2]}</button>
                            <button className="k-btn k-yellow w-100 h-50">{inputField.options[3]}</button>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}

function Start({ code, startQuiz, players }) {

    return (
        <div className="row m-0">
            <div className="col-12 col-sm-9 col-md-7 text-center my-auto mx-auto bg-dark whitetext">
                <h1>kods: {code}</h1>
                <div className="row buttoncolbg my-1 golden">
                    <button className="btn-start btn-red buttoncolbg" type="button" onClick={() => startQuiz()}>start</button>
                </div>
                <h2>spēlētāji: {players}</h2>
            </div>
        </div>
            );
}

function Break({ inputField, timer }) {
    return (
        <>
            <div className="row m-0">
                <div className="col-12 col-md-10 text-center my-auto mx-auto bg-dark whitetext p-2">
                    <img className="img-fluid" style={{ maxHeight: "500px" }} src={inputField.image}></img>
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
                <div className="col-12 col-sm-9 col-md-7 text-center my-auto mx-auto bg-dark whitetext">
                    <h1><b>Uzvarētāji!</b></h1>
                    <div className="text-start">
                        <div className="row buttoncolbg my-1 golden">
                            <div className="col">
                                <h2 className="text-start">1. {players[0].name}</h2>
                            </div>
                            <div className="col">
                                <h2 className="text-end">{players[0].points}</h2>
                            </div>
                        </div>
                        <div className="row buttoncolbg my-1 silver">
                            <div className="col">
                                <h2 className="text-start">1. {players[1].name}</h2>
                            </div>
                            <div className="col">
                                <h2 className="text-end">{players[1].points}</h2>
                            </div>
                        </div>
                        <div className="row buttoncolbg my-1 bronze">
                            <div className="col">
                                <h2 className="text-start">1. {players[2].name}</h2>
                            </div>
                            <div className="col">
                                <h2 className="text-end">{players[2].points}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}