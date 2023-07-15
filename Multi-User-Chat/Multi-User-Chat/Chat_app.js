// For input/output, exiting the program, and command line arguments
const process = require('node:process');
const stdout = process.stdout;
const stdin = process.stdin;
// For user input
const readline = require('node:readline');
// For networking
const net = require('node:net');
const { Stream } = require('node:stream');

let serverAddress ='localhost'
const SERVER_PORT = 1234
// Our input controller
const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: '',
});

function regenPrompt() {
    // Kind of like console.log, but without formatting (we control everything)
    stdout.write('\n');
    rl.setPrompt("> ");
    // make sure the readline interface is accepting input 
    rl.prompt(true);
}

const testArr = [];
testArr.push("check","checktwo")
console.log(testArr[0], testArr[1])




/**
 * 
 * @param {Buffer} line 
 */

function submit(line) {
    stdout.moveCursor(0, -2);
    stdout.cursorTo(0);
    stdout.clearScreenDown()
  //  const socketCon = (Element) => Element =
    //socketInd = socketArr.findIndex('connection')
    const isSocket = (Element) => Element !== undefined && Element !== "test"
    socketArr[socketArr.findLastIndex(isSocket)].write(line)
    console.log(socketArr[socketArr.findLastIndex(isSocket)])
    console.log("You: " + line);
    regenPrompt()
}

rl.on('line', submit)

rl.resume

/**
 * When we receive a message
 * @param {Buffer} data The message data
 */
function onReceiveMessage(data) {
    // make sure we don't accidentally overwrite anything
    rl.pause()
    // move the cursor up one and all the way to the left
    stdout.moveCursor(0, -1);
    stdout.cursorTo(0);
    // clear everything downwards
    stdout.clearScreenDown();
    // Print out the message we received
    console.log("Other User: " + data.toString());
    // Restore the message prompt
    regenPrompt()
}

function onClientConnection(socketsArray) {
    handleSocket(socketsArray, true)
    doClientStuff()
    regenPrompt()
}


/**
 * 
 * @param {Boolean} isReady 
 */


/**
 * @param {net.Socket} socketsArray
 * @param {Boolean} isReady
 * @param {net.Socket}
 */
var socketArr = ['test']


function handleSocket(socketsArray, isReady) {

    // We aren't accepting any more connections, so close the server
    // Store the socket connection as a global variable

    socketArr.push(socketsArray)

    // Don't be fooled- this "motd" function is only
    // usable inside of this "handleSocket" function!
    function connectCallback() {
        // Some JavaScript trickery: the "or" operator (aka. the two pipes) evaluates to whichever statement is true.
        console.log("--- Now connected to", (serverAddress), "---\n");
        // When we receive a message, run "onReceiveMessage"
        socketsArray.on('data', onReceiveMessage)

        // When the socket closes, run "onSocketClose"


        // Restore the message prompt
        regenPrompt()
       
    }

    if (isReady) {
        // if connected, print the motd
        connectCallback()
    } else {
        // if waiting to connect, print the motd when connected
        //chatClient.listen(SERVER_PORT, serverAddress, 'connect', connectCallback) 

       
    }
}
function doClientStuff() {
    console.log("--- Joining server... ---");
    // Create a socket connection and then give it to the handleSocket function 
    handleSocket(
       chatClient =  net.createConnection({
            host: serverAddress,
            port: SERVER_PORT
        })
    );
    chatClient.on('connection', onClientConnection)





}
function ipManager(answer){
    let isAnswerValid;
    if (answer == "localhost") {
        isAnswerValid = 4;
    } else {
        isAnswerValid = net.isIP(answer);
    }

    if (isAnswerValid == 4 || isAnswerValid == 6) {
        serverAddress = answer;
        doClientStuff();
    } else {
        // ask again or close the program (print out a message?)
        rl.question("INVALID IP. PLEASE TRY AGAIN\n", ipManager)
    }
}
rl.question("Please Enter Server IP\n", ipManager)
