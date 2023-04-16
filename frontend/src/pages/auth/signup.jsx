import Signup_Form from "../components/forms/signup_form";
function Signup() {
    return (
        <div className="flex-row flex-grow-1 my-auto text-center">
            <div className="col-12 flex-grow-1">
                <h1>SIGNUP</h1>
                <Signup_Form />
            </div>
        </div>
    );
}

export default Signup;
