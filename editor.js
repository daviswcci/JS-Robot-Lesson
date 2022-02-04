const code = document.getElementById("code");
var dragging, draggedOver;

const forBlock = `
<p> Loop: <select class="forOption">
            <option value="1">Move</option>
            <option value="2">Rotate CW</option>
            <option value="3">Rotate CCW</option>
            <option value="4">Stop</option>
        </select>  <input type="number" id="quantity" name="quantity" value="1" min="1" max="10" class="forCount"> times </p>

</div>
`

const moveBlock = `
    <p> Move forward 1 space </p>
`

const rotBlock = `
    <p> Rotate 
        <select class="rotOption">
            <option value="1">clockwise</option>
            <option value="-1">counterclockwise</option>
        </select> 
    </p>
`

const stopBlock = `
    <p> Stop </p>
`

const deleteButton = `
    <button class="removeBtn">Remove</button>
`

function addFor(){
    var element = document.createElement("li");
    element.draggable = true;
    element.addEventListener('drag', setDragging); 
    element.addEventListener('dragover', setDraggedOver);
    element.addEventListener('dragend', drop);
    element.classList.add("forCode");
    element.classList.add("codeBlock");
    element.innerHTML = forBlock;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x"
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => element.remove();

    element.appendChild(deleteBtn)
    code.appendChild(element);
}

function addMove(){
    var element = document.createElement("li");
    element.draggable = true;
    element.addEventListener('drag', setDragging); 
    element.addEventListener('dragover', setDraggedOver);
    element.addEventListener('dragend', drop);
    element.classList.add("moveCode");
    element.classList.add("codeBlock");
    element.innerHTML = moveBlock;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x"
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => element.remove();

    element.appendChild(deleteBtn)
    code.appendChild(element);
}

function addRot(){
    var element = document.createElement("li");
    element.draggable = true;
    element.addEventListener('drag', setDragging); 
    element.addEventListener('dragover', setDraggedOver);
    element.addEventListener('dragend', drop);
    element.classList.add("rotCode");
    element.classList.add("codeBlock");
    element.innerHTML = rotBlock;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x"
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => element.remove();

    element.appendChild(deleteBtn)
    code.appendChild(element);
}

function addStop(){
    var element = document.createElement("li");
    element.draggable = true;
    element.addEventListener('drag', setDragging); 
    element.addEventListener('dragover', setDraggedOver);
    element.addEventListener('dragend', drop);
    element.classList.add("stopCode");
    element.classList.add("codeBlock");
    element.innerHTML = stopBlock;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x"
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => element.remove();

    element.appendChild(deleteBtn)
    code.appendChild(element);
}

function setDragging(e){
    let elements = Array.from(document.getElementById("code").children)
    dragging = elements.indexOf(e.target)
}

function setDraggedOver(e){
    let elements = Array.from(document.getElementById("code").children)
    draggedOver = elements.indexOf(e.target)
    //console.log(draggedOver);
}

function drop(){
    let elements = document.getElementById("code").children

    //console.log("dragging" + dragging);
    
    let draggingElement = elements[dragging];
    let draggedOverElement = elements[draggedOver];

    if(draggedOverElement != undefined){
        elements[dragging].remove();
        //console.log(draggedOverElement);
        draggedOverElement.parentNode.insertBefore(draggingElement,draggedOverElement)
    }
}
