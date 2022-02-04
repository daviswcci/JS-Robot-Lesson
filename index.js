const grid = document.getElementById("grid");

// coordinates are in x,y format but y is flipped
let robot = [1,8]
let hasKey = false;
let dir = "N";
let actions = 0;
let completed = false;
let keys = [[6,4],[14,2]]
let lock = [12,6]

const dirs = ["N","E","S","W"]
const end = [14,7]


let map = [
    [false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false],
    [false, true, true, true, true, true, true, false,true, true, true, true, true, true, true, false],
    [false, true, false, true, false, true, false, false,false, false, true, false, false, false, true, false],
    [false, true, false, true, false, true, true, true,true, false, true, true, true, false, true, false],
    [false, true, false, true, false, true, true, true,true, false, true, false, true, false, true, false],
    [false, true, false, true, false, false, false, true,false, false, true, false, true, false, true, false],
    [false, true, false, true, true, true, true, true,true, false, true, false, true, false, false, false],
    [false, true, false, true, false, true, false, true,true, false, true, false, true, false, true, false],
    [false, true, true, true, false, true, true, true,true, true, true, false, true, true, true, false],
    [false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false],
    ]

function displayBoard(){
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            var space = document.createElement("div");
            space.id = j + "," + i;          
            space.classList.add("space");
            space.classList.add("row" + i);
            space.classList.add("col" + j);      
            grid.appendChild(space);
        }
    }
}
displayBoard();

// definitely a way to shorten this, but i can do that later
function colorGrid(){
    for(let i = 0; i < map.length; i++){
        for (let j = 0; j < map[0].length; j++){
            let space = document.getElementById(j + "," + i);
            space.style.backgroundColor = map[i][j] ? "white" : "black";
            space.innerText = "";
        }
    }
    let space = document.getElementById(end[0] + "," + end[1]);
    space.style.transform = 'rotate(0deg)';
    space.style.backgroundColor = "red";
    space.innerText = "End";

    if(lock.length != 0){
        //console.log(lock);
        space = document.getElementById(lock[0] + "," + lock[1]);
        space.style.transform = 'rotate(0deg)';
        space.style.backgroundColor = "grey";
        space.innerText = "Lock";
    }

    keys.forEach(key => {
        space = document.getElementById(key[0] + "," + key[1]);
        space.style.transform = 'rotate(0deg)';
        space.style.backgroundColor = "gold";
        space.innerText = "Key";
    });

    space = document.getElementById(robot[0] + "," + robot[1]);
    space.style.backgroundColor = "green";
    space.innerText = "Robo";
    if(dir == "N"){
        space.style.transform = 'rotate(0deg)';
    } else if (dir == "E") {
        space.style.transform = 'rotate(90deg)';
    } else if (dir == "S") {
        space.style.transform = 'rotate(180deg)';
    } else if (dir == "W") {
        space.style.transform = 'rotate(270deg)';
    }
}

function keyCheck(){
    keys.forEach(key => {
        //console.log(key)
        //console.log(robot);
        if(key[0] == robot[0] && key[1] == robot[1]){
            hasKey = true;
            let i = keys.indexOf(key)
            keys.splice(i,1);
            //console.log("here");
            lock = [];
        }
    })
}

function endCheck(){
    if(end[0] == robot[0] && end[1] == robot[1]){
        let score = document.getElementById("score");
        score.innerText = "Moves: " + actions;
        let winModal = document.getElementById("winModal");
        winModal.style.display = "block";
        completed = true;
    } else {
        let loseModal = document.getElementById("loseModal");
        loseModal.style.display = "block";
        completed = false;
    }
}

function moveRobot(){

    let posn = [robot[0],robot[1]]; // have to do it this way, else its a copy.
    if(dir == "N"){
        posn[1]--;
    } else if (dir == "E") {
        posn[0]++;
    } else if (dir == "S") {
        posn[1]++;
    } else if (dir == "W") {
        posn[0]--;
    }
    if(!map[posn[1]][posn[0]]){
        //console.log("stuck");
        return;
    } else if (lock[0] == posn[0] && lock[1] == posn[1] && !hasKey){
        return;
    }
    robot = posn;
}

// either 1 or -1
function rotateRobot(rot){
    if (rot != 1 && rot != -1){
        return;
    }
    let i = dirs.indexOf(dir)
    //console.log(i);
    let newI = parseInt(rot) + i
    //console.log(newI);
    if (newI < 0) {
        newI = dirs.length - 1
    } else {
        newI = newI % dirs.length
    }
    dir = dirs[newI];
}

// instruction = [int,value]
// 

function robotActions(instruction){
    if(instruction[0] == 0){
        moveRobot()
    } else if (instruction[0] == 1) {
        rotateRobot(instruction[1])
    } else {
        // stop?
    }
    actions++;
}

function runProgram(){
    sendToStart();
    let instructions = parseCodeHTML();
    //console.log(instructions);

    instructions.forEach(async (instruction) => {
        // figure this out
        robotActions(instruction);
        keyCheck();
        colorGrid();
        //await new Promise(resolve => setTimeout(resolve, 1000));
    });
    endCheck();
}

function runProgramAnimated(){
    sendToStart();
    let instructions = parseCodeHTML();
    //console.log(instructions);

    let i = 0;
    let interval = setInterval(() => {
        if(i < instructions.length){
            robotActions(instructions[i]);
            keyCheck();
            colorGrid();
        } else {
            endCheck();
            clearInterval(interval);
        }
        i++
    }, 1000);
}

function parseCodeHTML(){
    let instructions = [];
    let codeElements = Array.from(document.getElementById("code").children);
   //console.log(codeElements);
        codeElements.forEach((codeBlock) => {
        if(codeBlock.classList.contains("forCode")){
            let option = codeBlock.querySelector(".forOption").value
            let times = codeBlock.querySelector("#quantity").value
            for(let i = 0; i < times; i++){
                if(option == 1){
                    instructions.push([0,1]);
                } else if (option == 2){
                    instructions.push([1,1]);
                } else if (option == 3){
                    instructions.push([1,-1]);
                } else {
                    instructions.push([2]);
                }
            }
        } else if (codeBlock.classList.contains("rotCode")){
            let rot = codeBlock.querySelector(".rotOption").value
            instructions.push([1,parseInt(rot)])
        } else if (codeBlock.classList.contains("moveCode")){
            instructions.push([0,1]);
        } else if (codeBlock.classList.contains("stopCode")){
            instructions.push([2]);   
        }
    })
    return instructions;
}

function sendToStart(){
    completed = false;
    robot = [1,8]
    hasKey = false;
    dir = "N";
    actions = 0;
    keys = [[6,4],[14,2]]
    lock = [12,6]
    colorGrid();
}
sendToStart();

function resetGame(){
    sendToStart();
    let code = document.getElementById("code");
    code.innerHTML = "";
    colorGrid();
}

function closeModal(){
    let modals = Array.from(document.getElementsByClassName("modal"));
    modals.forEach((modal) => {
        modal.style.display = "none";
    })
    sendToStart();
}

function printInstructions(){
    //closeModal();
    let instructionsModal = document.getElementById("instructionsModal");
    let list = instructionsModal.querySelector("#instructionsList");
    list.innerHTML = "";
    let instructions = [];
    let codeElements = Array.from(document.getElementById("code").children);
   codeElements.forEach((codeBlock) => {
    if(codeBlock.classList.contains("forCode")){
        let option = codeBlock.querySelector(".forOption").value
        let times = codeBlock.querySelector("#quantity").value
        if (option == 1){
            option = "Move forward"
        } else if (option == 2) {
            option = "Rotate clockwise"
        } else if (option == 3) {
            option = "Rotate counterclockwise"
        } else {
            option = "Stop"
        }
        instructions.push("Loop: " + option + " " + times + " time(s).")
    } else if (codeBlock.classList.contains("rotCode")){
        let rot = codeBlock.querySelector(".rotOption").value
        let option = rot == 1 ? "clockwise" : "counterclockwise";
        instructions.push("Rotate " + option + ".");
    } else if (codeBlock.classList.contains("moveCode")){
        instructions.push("Move forward.")
    } else if (codeBlock.classList.contains("stopCode")){
        instructions.push("Stop.")
    }
   })
    //console.log(instructions)

    instructions.forEach((instruction) => {
        let li = document.createElement("li");
        li.innerText = instruction
        list.appendChild(li);
    });
    let moves = document.createElement("p");
    moves.innerText = "Instruction Count: " + instructions.length;
    runProgram();
    list.append(moves);
    let completedText = document.createElement("p");
    completedText.innerText = "Completed: " + completed;
    list.append(completedText);
    instructionsModal.style.display = "block";
}
