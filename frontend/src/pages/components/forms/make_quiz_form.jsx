import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState, useEffect } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";

function Make_Quiz_Form() {
    const [state, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [selected, setSelected] = useState();
    const { register, handleSubmit } = useForm();

    const FotoQ = ["lokācija", "gadskaitļi", "Karte", "ātrums"];
    const AudioQ = ["komponists", "nosaukums", "gadskaitlis"];

    let options = null;
    let type = null;

    const [inputFields, setInputFields] = useState([
        { field: 'foto', question: FotoQ[0], options: FotoQ.map((el) => <option key={el}>{el}</option>), image:""}
    ])

    const changeSelectOptionHandler = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);

        setSelected(event.target.value);
        if (event.target.value == "foto") {
            type = FotoQ;
        } else if (event.target.value == "audio") {
            type = AudioQ;
        }
        data[index]['question'] = type[0]
        data[index]['options'] = type.map((el) => <option key={el}>{el}</option>);

        console.log(data);
    };
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = (event) => {
        event.preventDefault();
        let data = [...inputFields];
        let newfield = { field: data[data.length - 1].field, question: data[data.length - 1].question, options: data[data.length - 1].options }

        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    }
    const onSubmit = (e) => {
        let data = [...inputFields];
        const payload = new FormData();
        payload.append("field", data.map((e) => e.field));
        payload.append("question", data.map((e) => e.question));
        console.log(data);
        axios.post("http://127.0.0.1:8000/quiz/make_quiz", payload)
            .then((res) => {
                data.forEach((e, i) => {
                    e.image = res.data[i].image;
                    forceUpdate();
                })
            })
    }
    return (
        <div className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index} >
                            <img src={input.image} width="500px"></img>
                            <br />
                            <label>mediju tips: </label>
                            <select value={input.question} defaultValue={input.field} name="field" id="field" onChange={event => changeSelectOptionHandler(index, event)}>
                                <option value="foto">Foto</option>
                                <option value="audio">Audio</option>
                            </select>
                            <label>jautajuma veids: </label>
                            <select value={input.question} defaultValue={ input.question } name="question" id="question" onChange={event => handleFormChange(index, event)}>
                                {input.options}
                            </select>
                            <button type="button" onClick={() => removeFields(index)}>Lauks tiek atņemts!</button>

                        </div>
                    )
                })}
                <button type="button" onClick={addFields}>Pievieno jaunu lauku beigās!</button>
                <input type="submit" />

            </form>
        </div>
    );
}

export default Make_Quiz_Form;

