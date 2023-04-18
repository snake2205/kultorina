import Logout_Form from "../components/forms/logout_form";
function Logout() {
    return (
        <div className="flex-row flex-grow-1 my-auto text-center">
            <div className="col-12 flex-grow-1">
                <h1>LOGOUT</h1>
                <Logout_Form />
            </div>
        </div>
    );
}

export default Logout;

