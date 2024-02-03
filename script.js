//  https://picsum.photos/200/300?random=1
//  https://picsum.photos/200
//  https://api.api-ninjas.com/v1/randomimage?width=?;height=?      max 5000

// html elements
let grid_size_input = document.getElementById("grid_size");
let mode_select = document.getElementById("mode");
let puzzle_container = document.getElementById("puzzle");
let timer_div = document.getElementById("timer");
let moves_div = document.getElementById("moves");

// variables
let mode = mode_select.value;
let grid_size = grid_size_input.value;
let nums = [];
let num;
let moves = 0;
let secs = 0;
let timer;
let rows = [];
let cols = [];

// event listeners
grid_size_input.addEventListener("keyup", function (event) {
    grid_size = grid_size_input.value
    if (grid_size.length >= 2) {
        grid_size_input.value = grid_size.slice(0, 2);// if the length is > 2 it removes the excess
    }
    if (event.key == "Enter") {
        start();
    }
});


function start() {
    reset();
    resetMoves();
    createGrid();
    startTimer();
}

function reset() {
    while (puzzle_container.firstChild) {// iterates the container while it has children and it deletes them
        puzzle_container.removeChild(puzzle_container.firstChild)
    }

}

function createNumArray() {
    nums.splice();
    for (var i = 1; i <= (grid_size * grid_size) - 1; i++) {
        nums.push(i);
    }
    nums.push("");// empty tile
}

function retNumNLower() {
    num = nums[Math.floor((Math.random() * nums.length))];
    index = nums.indexOf(num);
    nums.splice(index, 1);// removes the num from the list; 2nd param removes only 1 element
    return num;
}

function createGrid() {
    createNumArray();

    for (i = 0; i < grid_size; i++) {
        // create row
        var row = document.createElement("div");
        row.classList.add("row");
        for (j = 0; j < grid_size; j++) {
            // create div and add to row
            var tile = document.createElement("div");
            tile.classList.add("tile");
            let innTxt = retNumNLower();
            tile.innerText = innTxt;
            if (innTxt == "") {
                tile.classList.add("empty_tile");
                tile.classList.remove("tile");
            }
            row.appendChild(tile);
        }
        puzzle_container.appendChild(row);
    }

    document.querySelectorAll(".tile").forEach(function (tile) {
        tile.addEventListener("click", function (event) {
            var tile = event.target;
            var av_tile = checkAvailableTile(tile);
            if (av_tile != false) {
                moveTile(tile,av_tile)
                increaseMoves();
            }
        });
    }

    )
}

function checkAvailableTile(tile) {
    let parent_row = tile.parentElement;

    if (tile.nextSibling && tile.nextSibling.classList.contains("empty_tile")) {
        return tile.nextSibling;
    } else if (tile.previousSibling && tile.previousSibling.classList.contains("empty_tile")) {
        return tile.previousSibling;
    } else {
        rows = Array.from(puzzle_container.children);
        let rowIndex = getIndex(parent_row);

        if (rows[rowIndex - 1] && rows[rowIndex - 1].children && rows[rowIndex - 1].children[getIndex(tile)] &&
            rows[rowIndex - 1].children[getIndex(tile)].classList.contains("empty_tile")) {
            return rows[rowIndex - 1].children[getIndex(tile)];
        } else if (rows[rowIndex + 1] && rows[rowIndex + 1].children && rows[rowIndex + 1].children[getIndex(tile)] &&
            rows[rowIndex + 1].children[getIndex(tile)].classList.contains("empty_tile")) {
            return rows[rowIndex + 1].children[getIndex(tile)];
        } else {
            return false;
        }
    }
}


function moveTile(tile,empty_tile) {
    tile.classList.toggle("tile");
    tile.classList.toggle("empty_tile");

    empty_tile.classList.toggle("tile");
    empty_tile.classList.toggle("empty_tile");

    empty_tile.innerText = tile.innerText;
    tile.innerText ="";
}


function getIndex(element) {
    let parent = element.parentElement;
    let index = Array.from(parent.children).indexOf(element);
    return index;
}

function startTimer() {
    clearInterval(timer);
    secs = 0;
    timer = setInterval(function () {
        secs++;
        timer_div.innerText = secs + "s";
    }, 1000);
}

function increaseMoves() {
    moves++;
    moves_div.innerText = moves + " moves";
}

function resetMoves() {
    moves = 0;
    moves_div.innerText = "";

}