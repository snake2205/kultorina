
function Start_Quiz() {
    var ws = new WebSocket("ws://localhost:8000");
    ws.onmessage = function (event) {
        var messages = document.getElementById('messages')
        var message = document.createElement('li')
        var content = document.createTextNode(event.data)
        message.appendChild(content)
        messages.appendChild(message)
    };
    function sendMessage() {
        var input = document.getElementById("messageText")
        ws.send(input.value)
        input.value = ''
    }
    return (
        <>
            <h1>WebSocket Chat</h1>
            <input type="text" id="messageText" autoComplete="off" />
            <button type="button" onClick={() => sendMessage()}>Send</button>
            <ul id='messages'>
            </ul>
        </>
    );
}

export default Start_Quiz;