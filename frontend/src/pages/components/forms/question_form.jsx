import React from "react";
import { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";

function Question_Form({ inputField, index, changeInputField, removeInputField }) {
    const [selected, setSelected] = useState();

    const FotoQ = ["lokācija", "gadskaitļi", "Karte", "ātrums"];
    const AudioQ = ["komponists", "nosaukums", "gadskaitlis"];
    let options = null;
    let type = null;

    const changeSelectOptionHandler = (index, event) => {
        let data = inputField;
        data[event.target.name] = event.target.value;
        changeInputField(data, index);
        setSelected(event.target.value);
        if (event.target.value == "foto") {
            type = FotoQ;
        } else if (event.target.value == "audio") {
            type = AudioQ;
        }
        data['question'] = type[0]
        data['options'] = type.map((el) => <option key={el}>{el}</option>);

        changeInputField(data, index);
    };

    const handleFormChange = (index, event) => {
        let data = inputField;
        console.log(data);
        data[event.target.name] = event.target.value;
        changeInputField(data, index);
    }

    var component = inputField.activated === true ?
        <ActiveQuestion
            inputField={inputField}
            index={index}
            changeSelectOptionHandler={changeSelectOptionHandler}
            handleFormChange={handleFormChange}
            removeInputField={removeInputField}
            changeInputField={ changeInputField }
        /> :
        <NotActiveQuestion
            inputField={inputField}
            index={index}
            changeSelectOptionHandler={changeSelectOptionHandler}
            handleFormChange={handleFormChange}
        />;

    return (
        component
    )
}

function NotActiveQuestion({ inputField, index, changeSelectOptionHandler, handleFormChange }) {
    return(
        <div className="row py-2 mx-0">
            <div className="col-11">
                <div className="border border-dark border-1 bg-dark p-2">
                    <div className="text-center">
                        <label>mediju tips: &nbsp; </label>
                        <select className="buttoncolbg whitetext bordermain" value={inputField.field} defaultValue={inputField.field} name="field" id="field" onChange={event => changeSelectOptionHandler(index, event)}>
                            <option value="foto">Foto</option>
                            <option value="audio">Audio</option>
                        </select>
                        <label>&nbsp; jautajuma veids: &nbsp; </label>
                        <select className="buttoncolbg whitetext bordermain" value={inputField.question} defaultValue={inputField.question} name="question" id="question" onChange={event => handleFormChange(index, event)}>
                            {inputField.options}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActiveQuestion({inputField, index, changeSelectOptionHandler, handleFormChange, removeInputField, changeInputField}) {
    const { token, setToken } = useToken();
    const refresh = (index) => {
        const payload = new FormData();
        payload.append("field", inputField.field);
        payload.append("question", inputField.question);
        axios.post("http://127.0.0.1:8000/quiz/make_quiz", payload, { headers: token })
            .then((res) => {
                inputField.quest = res.data[0];
                inputField.activated = true;
                changeInputField(inputField, index);
                //forceUpdate();
            })
    }

    const report = (index) => {
        const payload = new FormData();
        payload.append("field", inputField.field);
        payload.append("id", inputField.quest.id);
        axios.post("http://127.0.0.1:8000/quiz/report_question", payload, { headers: token })
            .then((res) => {
                console.log(res);
                //forceUpdate();
            })
    }
    return(
        <div className="row py-2 mx-0">
            <div className="col-11">
                <div className="border border-dark border-1 bg-dark p-2">
                    <Info inputField={inputField} />
                    <div className="text-center">
                        <label>mediju tips: &nbsp; </label>
                        <select className="buttoncolbg whitetext bordermain" value={inputField.field} defaultValue={inputField.field} name="field" id="field" onChange={event => changeSelectOptionHandler(index, event)}>
                            <option value="foto">Foto</option>
                            <option value="audio">Audio</option>
                        </select>
                        <label>&nbsp; jautajuma veids: &nbsp; </label>
                        <select className="buttoncolbg whitetext bordermain" value={inputField.question} defaultValue={inputField.question} name="question" id="question" onChange={event => handleFormChange(index, event)}>
                            {inputField.options}
                        </select>
                    </div>
                </div>
            </div>
            <OutsideButtons refresh={refresh} report={report} removeInputField={removeInputField} index={index} />
        </div>
    )
}


function Info({ inputField }) {
    const [state, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    return (
        <div>
            <div className="col px-0 text-center">
                <img className="img-fluid" src={inputField.quest.image} width="500px"></img>
            </div>
            <h2 className="text-center">Kur atrodas šī vieta?</h2>
            <div className="buttoncolbg my-2 py-2">
                <h3>Atbildes:</h3>
                <ul>
                    <li className="green">{inputField.quest.name}</li>
                    <li>{inputField.quest.fakes[0]}</li>
                    <li>{inputField.quest.fakes[1]}</li>
                    <li>{inputField.quest.fakes[2]}</li>
                </ul>
                <div className="text-center"><a href={inputField.quest.url}>{inputField.quest.url}</a></div>
            </div>
        </div>
    )
}

function OutsideButtons({ report, refresh, removeInputField, index }) {
    return (
        <div className="col">
            <div className="row py-1">
                <button className="btn btn-danger btn-sm btn-square-md" type="button" onClick={() => report(index)} title="reportēt">
                    <i className="bi bi-flag"></i>
                </button>
            </div>
            <div className="row py-1">
                <button className="btn btn-success btn-sm btn-square-md" type="button" onClick={() => refresh(index)} title="atjaunināt">
                    <i className="bi bi-arrow-repeat"></i>
                </button>
            </div>
            <div className="row py-1">
                <button className="btn btn-secondary btn-sm btn-square-md" type="button" onClick={() => removeInputField(index)} title="dzēst">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    )
}
export default Question_Form;