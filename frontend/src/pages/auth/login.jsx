import Login_Form from "../components/forms/login_form";
function Login() {
    return (
        <div className="flex-row flex-grow-1 my-auto text-center">
            <div className="col-12 flex-grow-1 ">
                <h1>LOGIN</h1>
                <Login_Form />
            </div>
        </div>
    );
}

export default Login;

