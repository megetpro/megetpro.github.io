const container = document.querySelector('.container');
const Slots = document.querySelectorAll('.ISlot');
const Hotbar = document.getElementById("Hotbar");
const sec = document.getElementById("earth");
const buttonsContainer = document.querySelector('.buttons');
var boxNumber = 1;
var UpperleftX = 0;
var UpperleftY = 0;
var boxX = UpperleftX;
var boxY = UpperleftY;
var moveByV = 2;
var moveByH = 2;
var bothH = 0;
var bothV = 0;
var cBox;
var GridSize = 18;
var selectedBlockType = 1;
var currentBlock = "";
var currentColor = "";
var currentBlockCoords = "";
var cBoxCoords = "";
var Preview = document.getElementById("preview");
var PreviewXY = [];
var PreviewX = 0;
var PreviewY = 0;
var ColorNumberToName = ["forestgreen","gray","royalblue", "firebrick", "darkorange", "navy","goldenrod","darkmagenta","saddlebrown","Mediumpurple"];
var NoPlaceHereColor = "firebrick";
var DemolishColor = "red";
var selectedColor = "";
var mousePressed = false;
var demolish = false;
var number = 1



BlockStart = () => {
    const boxs = container.querySelectorAll('.box')
    boxs.forEach(box => box.addEventListener('mouseover', () => {
        BlockMouseOver(box);
    }));
    Preview.addEventListener("mousedown", (Event) => {
        if (Event.button == 0) {
            mousePressed = true;
            PlaceBlock()
        }
    });
    Preview.addEventListener("mouseup", (Event) => {
        if (Event.button == 0) {
            mousePressed = false;
        }
    });
    Preview.style.background = ColorNumberToName[selectedBlockType];
}

function HotbarStarter() {
    var HotbarNumber = 0
    for(let slot of Slots) {
        HotbarNumber++
        slot.addEventListener("click", (Event) => {
            HotbarControl(Event)
        })
        slot.setAttribute("data-BlockId", HotbarNumber)
        slot.style.background = ColorNumberToName[HotbarNumber]
    }
}

function HotbarControl(e) {
    var SelectedSlot = e.target;
    selectedBlockType = SelectedSlot.dataset.blockid;
    PreviewColor();
}

function BlockMouseOver(Block) {
    currentBlock = Block;
    currentBlockCoords = Block.dataset.coords;
    PreviewXY = currentBlockCoords.split(",");
    PreviewX = (PreviewXY[0]-UpperleftX)*50;
    PreviewY = (PreviewXY[1]-UpperleftY)*50;
    Preview.style.top = PreviewY + "px";
    Preview.style.left = PreviewX + "px";
    PreviewColor()
    if (mousePressed == true) {
        PlaceBlock()
    }
}

function PreviewColor() {
    selectedColor = ColorNumberToName[selectedBlockType]
    if (demolish == true) {
        Preview.style.background = DemolishColor;
    }
    else if (currentBlock.style.background != selectedColor) {
        Preview.style.background = selectedColor
    }
    else if (currentBlock.style.background == selectedColor) {
        Preview.style.background = NoPlaceHereColor;
    }
}

function PlaceBlock() {
    if (demolish == false) {
        sessionStorage.setItem(currentBlockCoords, selectedBlockType);
        currentBlock.style.background = ColorNumberToName[selectedBlockType]
    }
    else {
        sessionStorage.removeItem(currentBlockCoords)
        currentBlock.style.background = ColorNumberToName[0]
    }
    PreviewColor()
}

function moveBackRename() {
    boxNumber = 1;
    var boxX = UpperleftX;
    var boxY = UpperleftY;  
    for(let i = 0;i < (GridSize*GridSize); i++) {
        cBox = document.getElementById(boxNumber);
        boxNumber++
        if(boxX > UpperleftX + GridSize - 1) {
            boxX = UpperleftX;
            boxY++
        }
        cBoxCoords = `${boxX},${boxY}`;
        if (sessionStorage.getItem(cBoxCoords) === null) {
            cBox.style.background = "forestgreen";
        }
        else {
            cBox.style.background = ColorNumberToName[sessionStorage.getItem(cBoxCoords)]
        }
        //cBox.innerHTML = cBoxCoords;
        cBox.setAttribute("data-coords", cBoxCoords);
        boxX++;
    }
}

function creatDivs() {
    boxNumber = 1;
    var boxX = UpperleftX;
    var boxY = UpperleftY;  
    for(let i = 0;i < (GridSize * GridSize); i++) {
        const div = document.createElement('div') 
        if(boxX > UpperleftX + GridSize - 1) {
            boxX = UpperleftX;
            boxY++
        }
        div.id = boxNumber;
        //div.innerHTML = `${boxX},${boxY}`;
        div.setAttribute("data-coords", `${boxX},${boxY}`);
        boxNumber++;
        boxX++;
        div.style.border = "1px solid dimgray"
        container.style.gridTemplateColumns = `repeat(${GridSize}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${GridSize}, 1fr)`;
        container.appendChild(div).classList.add('box')
    }
    moveBackRename()
}

function moveleft() {
    var left = parseInt(window.getComputedStyle(earth).getPropertyValue("left"));
    moveByH = 2;
    if(bothV == 1) {
        moveByH = 1;
    }
    if(left > 125) {
        UpperleftX--
        moveBackRename()
        sec.style.left = 75 + moveByH + "px";
    }
    else{
        sec.style.left = left + moveByH + "px";
    }
}

function moveright() {
    var left = parseInt(window.getComputedStyle(earth).getPropertyValue("left"));
    moveByH = 2;
    if(bothV == 1) {
        moveByH = 1;
    }
    if(left < 25) {
        UpperleftX++
        moveBackRename()
        sec.style.left = 75 - moveByH + "px";
    }
    else{
        sec.style.left = left - moveByH + "px";
    }
}

function moveup() {
    var top = parseInt(window.getComputedStyle(earth).getPropertyValue("top"));
    moveByV = 2;
    if(bothH == 1) {
        moveByV = 1;
    }
    if(top > 125) {
        UpperleftY--
        moveBackRename()
        sec.style.top = 75 + moveByV + "px";
    }
    else{
        sec.style.top = top + moveByV + "px";
    }
}

function movedown() {
    var top = parseInt(window.getComputedStyle(earth).getPropertyValue("top"));
    moveByV = 2;
    if(bothH == 1) {
        moveByV = 1;
    }
    if(top < 25) {
        UpperleftY++
        moveBackRename()
        sec.style.top = 75 - moveByV + "px";
    }
    else{
        sec.style.top = top - moveByV + "px";
    }
}

document.addEventListener("keydown", Event => {
    var Key = Event.key
    if (Event.key === "a") {
        if (bothH == 0) {
            intervalH = setInterval(moveleft, 11)
            bothH++
        }
    }

    else if (Event.key === "d") {
        if (bothH == 0) {
            intervalH = setInterval(moveright, 11)
            bothH++
        }
    }
    else if (Event.key === "Backspace" || Event.key === "Delete") {
        demolish = !demolish;
        PreviewColor()
    }
    else if (Key == 1||Key == 2||Key == 3||Key == 4||Key == 5||Key == 6||Key == 7||Key == 8||Key == 9) {
        selectedBlockType = Key;
        demolish = false;
        PreviewColor()
    }

    if (Event.key === "w") {
        if (bothV == 0) {
            intervalV = setInterval(moveup, 11);
            bothV++
        }
    }
    else if (Event.key === "s") {
        if (bothV == 0) {
            intervalV = setInterval(movedown, 11);
            bothV++
        }
    }
});

document.addEventListener("keyup", Event =>{
    if (Event.key==="w"||Event.key==="s") {
        clearInterval(intervalV);
        bothV=0;
    }
    if (Event.key==="a"||Event.key==="d") {
        clearInterval(intervalH);
        bothH=0;
    }
});

creatDivs()

BlockStart()

HotbarStarter()