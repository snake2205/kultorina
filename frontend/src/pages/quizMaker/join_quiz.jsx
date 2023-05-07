import Join_Quiz_Form from "../components/forms/join_quiz_form";
function Join_Quiz() {
    return (
        <div className="flex-row flex-grow-1 my-auto text-center">
            <div className="col-12 flex-grow-1">
                <h1>Ievadi kodu!</h1>
                <Join_Quiz_Form />
            </div>
        </div>
    );
}

export default Join_Quiz;

