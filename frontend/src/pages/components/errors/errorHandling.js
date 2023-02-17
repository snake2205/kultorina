function return_error(err) {
    switch (err.response.status){
        case 400:
            return err.response.data.detail;
        case 422:
            return "please fill in all the fields";
        case 401:
            return err.response.data.detail;
    }
}

module.exports = { return_error };