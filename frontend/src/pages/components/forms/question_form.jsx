import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Question_Form({ inputField, index, changeInputField, removeInputField }) {
    const [state, updateState] = React.useState();
    const [selected, setSelected] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [activated, setActivated] = useState(false);

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

    const refresh = (index) => {
        const payload = new FormData();
        payload.append("field", inputField.field);
        payload.append("question", inputField.question);
        axios.post("http://127.0.0.1:8000/quiz/make_quiz", payload)
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
        axios.post("http://127.0.0.1:8000/quiz/report_question", payload)
            .then((res) => {
                console.log(res);
                //forceUpdate();
            })
    }
    return (
        <div className="py-2">
        <div className="border border-dark border-1 bg-white p-1">
            <ShowInfo inputField={ inputField} />
            <br />
            <label>mediju tips: </label>
            <select value={inputField.field} defaultValue={inputField.field} name="field" id="field" onChange={event => changeSelectOptionHandler(index, event)}>
                <option value="foto">Foto</option>
                <option value="audio">Audio</option>
            </select>
            <label>jautajuma veids: </label>
            <select value={inputField.question} defaultValue={inputField.question} name="question" id="question" onChange={event => handleFormChange(index, event)}>
                {inputField.options}
            </select>
            <button type="button" onClick={() => removeInputField(index)}>Lauks tiek atņemts!</button>
            <button type="button" onClick={() => refresh(index)}>Atjaunināt!</button>
            <button type="button" onClick={() => report(index)}>Reportēt!</button>

            </div>
        </div>
    )
}

function ShowInfo({ inputField }) {
    var Component = inputField.activated === true ? <Info inputField={inputField} /> : <></>;
    return Component;
}

function Info({ inputField }) {
    return (
        <div>
            <div className="col px-0 text-center">
                <img className="img-fluid" src={inputField.quest.image} width="500px"></img>
            </div>
            <br />
            <p className="text-center">Kur atrodas šī vieta?</p>
            <div className="text-left">
                <p>Atbildes:</p>
                <ul>
                    <li>{inputField.quest.name}</li>
                    <li>{inputField.quest.fakes[0]}</li>
                    <li>{inputField.quest.fakes[1]}</li>
                    <li>{inputField.quest.fakes[2]}</li>
                </ul>
            </div>
        <a href={inputField.quest.url}>{inputField.quest.url}</a>
        </div>
    )
}
export default Question_Form;