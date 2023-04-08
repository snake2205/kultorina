import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState, useEffect } from "react";
import  Question_Form  from "./question_form";

function Make_Quiz_Form() {
    const [state, updateState] = React.useState();
    //const forceUpdate = React.useCallback(() => updateState({}), []);
    const [selected, setSelected] = useState();
    const { register, handleSubmit } = useForm();

    const FotoQ = ["lokācija", "gadskaitļi", "Karte", "ātrums"];
    const AudioQ = ["komponists", "nosaukums", "gadskaitlis"];

    let options = null;
    let type = null;

    const [inputFields, setInputFields] = useState([
        { field: 'foto', question: FotoQ[0], options: FotoQ.map((el) => <option key={el}>{el}</option>), quest: {}, activated:false  }
    ])
    const [questions, setQuestions] = useState([
        { field: "", type:"", image:"", url:"", id:"", name:"", fakes:""}
    ])

    const changeInputField = (data, index) => {
        let arr = [ ...inputFields ];
        arr[index] = data
        setInputFields([...arr]);
        //forceUpdate();
    }

    const removeInputField = (index) => {
        let arr = [...inputFields];
        arr.splice(index, 1);
        setInputFields([...arr]);
        //forceUpdate();
    }

    const addFields = (event) => {
        event.preventDefault();
        let data = [...inputFields];
        let newQuestion = { field: "", type: "", image: "", url: "", id: "", name: "", fakes: "" }
        let newfield = { field: data[data.length - 1].field, question: data[data.length - 1].question, options: data[data.length - 1].options, quest:newQuestion, activated:false }
        setInputFields([...inputFields, newfield])
    }

    const refreshAll = (event) => {
        let data = [...inputFields];
        const payload = new FormData();
        payload.append("field", data.map((e) => e.field));
        payload.append("question", data.map((e) => e.question));
        axios.post("http://127.0.0.1:8000/quiz/make_quiz", payload)
            .then((res) => {
                data.forEach((e, i) => {
                    e.quest = res.data[i];
                    e.activated = true;
                    //this.forceUpdate();
                })
                setInputFields([...data]);
            })
    }

    const startQuiz = (e) => {
        let data = [...inputFields];
        const payload = new FormData();
        var arr =[]
        data.map((e) => {
            var myJsonString = JSON.stringify({ "field": e.field, "question": e.question, "id": e.quest.id, "fakes": e.quest.fakes });
            arr.push(myJsonString);
        })
        var arr = JSON.stringify(arr);
        payload.append("data", arr);
        axios.post("http://127.0.0.1:8000/quiz/start_quiz", payload)
            .then((res) => {
                console.log(res);
            })
    }
    return (
        <div className="row">
            <div className="col-md-8 col-12 mx-auto">
                {inputFields.map((input, index) => {
                    return (
                        <Question_Form
                            inputField={input}
                            index={index}
                            changeInputField={ changeInputField }
                            removeInputField={removeInputField}
                            key={index.toString()}
                            />
                    );
                })}
                <button type="button" onClick={addFields}>Pievieno jaunu lauku beigās!</button>
                <button type="button" onClick={refreshAll}> Atsvaidzini visu! </button>
                <button type="button" onClick={startQuiz}> Submit </button>
            </div>
        </div>
    );
}

export default Make_Quiz_Form;

