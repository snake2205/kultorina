import Data_Upload_Form from "../components/forms/data_upload_form";
function Data_Upload() {
    return (
        <div className="flex-row flex-grow-1 my-auto text-center">
            <div className="col-12 flex-grow-1">
                <h1>Data Upload</h1>
                <Data_Upload_Form />
            </div>
        </div>
    );
}

export default Data_Upload;