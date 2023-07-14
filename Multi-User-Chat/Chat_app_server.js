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
let remoteAddress ='localhost'
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
 * @param {net.Socket} 
 */
var socketArr = ["test"]


/**
 * 
 * @param {Buffer} line 
 */
function submit(line) {
    stdout.moveCursor(0, -2);
    stdout.cursorTo(0);
    stdout.clearScreenDown()

    socketArr[1].write(line)
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
    console.log("(From Clients)\nThem: " + data.toString());
    //socketArr[1 && 2].write(data)
    // Restore the message prompt
    const isSocket = (Element) => Element !== undefined && Element !== "test"
    socketArr[socketArr.findLastIndex(isSocket)].write(data)
    regenPrompt()
}
function onServerConnection(socketsArray) {
    handleSocket(socketsArray, true)
    doServerStuff()
    regenPrompt()
}

/**
 * 
 * @param {Boolean} isReady 
 */

function handleSocket(socketsArray, isReady) {
    chatServer.close()
    // We aren't accepting any more connections, so close the server
  
    // Store the socket connection as a global variable
    socketArr.push(socketsArray)

    // Don't be fooled- this "motd" function is only
    // usable inside of this "handleSocket" function!
    function connectCallback() {
        // Some JavaScript trickery: the "or" operator (aka. the two pipes) evaluates to whichever statement is true.
        console.log("--- Now connected to", (remoteAddress), "---\n");
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
        chatServer.listen(SERVER_PORT, serverAddress, 'connect', connectCallback) 
       
    }
}
function doServerStuff() {
    console.log("--- Waiting for a connection... ---");
    // Create a TCP server
    chatServer = net.createServer();
    // allow only one connection (this is one-on-one)
    chatServer.on('connection', onServerConnection);
    chatServer.listen(SERVER_PORT)
}
doServerStuff()