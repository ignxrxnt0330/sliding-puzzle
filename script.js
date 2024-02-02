//  https://picsum.photos/200/300?random=1
//  https://picsum.photos/200
//  https://api.api-ninjas.com/v1/randomimage?width=?;height=?      max 5000

// html elements
let grid_size_input = document.getElementById("grid_size");
let mode_select = document.getElementById("mode");
let puzzle_container = document.getElementById("puzzle");

// variables
let mode = mode_select.value;
let grid_size = grid_size_input.value;
let nums = [];
let num;

// event listeners
grid_size_input.addEventListener("keyup", function (event) {
    grid_size = grid_size_input.value
    if (grid_size.length >= 2) {
        grid_size_input.value = grid_size.slice(0, 2);// if the length is > 2 it removes the excess
    }
    if (event.key == "Enter") {
        start();
    } else {

    }
});
   



function checkAvailableTile() {

}

function moveTile(direction) {

}

function start() {
    reset();
    createGrid();
}

function reset() {
    while (puzzle_container.firstChild) {// iterates the container while it has children and it deletes them
        puzzle_container.removeChild(puzzle_container.firstChild)
    }
}

function createNumArray() {
    nums.splice();
    for (var i = 1; i <= (grid_size*grid_size) - 1; i++) {
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
            tile.innerText = retNumNLower();
            row.appendChild(tile);
        }
        puzzle_container.appendChild(row);
    }

    document.querySelectorAll(".tile").addEventListener("click", function (event) {
        var tile = event.target;
        console.log("123");
        if (checkAvailableTile()) {
            moveTile(checkAvailableTile(tile))
        }
    });
}

