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

puzzle_container.addEventListener("click", function (event) {
    var tile = event.target;
    if(tile.classList.contains("row")){
        return;
    }
    var av_tile = checkAvailableTile(tile);
    if (av_tile != false) {
        moveTile(tile, av_tile)
        increaseMoves();
        checkCompleted();
    }
});


function start() {
    reset();
    createGrid();
    startTimer();
}

function reset() {
    while (puzzle_container.firstChild) {// iterates the container while it has children and it deletes them
        puzzle_container.removeChild(puzzle_container.firstChild)
    }
    let nums = [];
    resetMoves();
}

function createNumArray() {
    nums.splice();
    for (var i = 1; i <= (grid_size * grid_size) - 1; i++) {
        nums.push(i);
    }
    nums.push("");// empty tile
    return nums;
}

// function retNumNRemove() {
//     // num = nums[Math.floor((Math.random() * nums.length))];
//     // index = nums.indexOf(num);
//     // nums.splice(index, 1);// removes the num from the list; 2nd param removes only 1 element
//     // return num;
//     return nums.splice(nums.indexOf(nums[Math.floor((Math.random() * nums.length))]), 1)
// }

function createGrid() {
    nums = createNumArray();
    let index = 0;
    for (i = 0; i < grid_size; i++) {
        // create row
        var row = document.createElement("div");
        row.classList.add("row");
        for (j = 0; j < grid_size; j++) {
            // create div and add to row
            var tile = document.createElement("div");
            tile.classList.add("tile");
            let innTxt = nums[index];
            index++;
            tile.innerText = innTxt;
            if (innTxt == "") {
                tile.classList.add("empty_tile");
                tile.classList.remove("tile");
            }
            row.appendChild(tile);
        }
        puzzle_container.appendChild(row);
    }
    shuffle();
}

function shuffle() {
    // to ensure that the puzzle is solvable, the position of the tiles cannot be randomized, it has some rules:
    // for odd sizes we have to alter the sorted array an odd amount of times, and an even ove for even sizes
    // if we iterate a method that swaps two tiles n number of times, n being the tile size, the puzzle is always solvable
    let tiles = puzzle_container.querySelectorAll(".tile");
    for (i = 0; i < grid_size * 2; i++) {
        let tile_1, tile_2;
        while (tile_1 === tile_2 || !tile_1 || !tile_2) {
            tile_1 = tiles[Math.floor((Math.random() * tiles.length))];
            tile_2 = tiles[Math.floor((Math.random() * tiles.length))];
        }
        swap(tile_1, tile_2)
    }
}

function swap(tile_1, tile_2) {
    // let t = false;
    let txt = tile_1.innerText;
    // if (tile_1.classList.contains("tile")) {
    //     t = true;
    // }

    tile_1.innerText = tile_2.innerText;
    tile_2.innerText = txt;

    // tile_1.classList.toggle("tile", !t);// t == true -> removes the parameter; t == false -> adds the parameter
    // tile_1.classList.toggle("empty_tile", t);

    // tile_2.classList.toggle("tile", t);
    // tile_2.classList.toggle("empty_tile", !t);
}

function checkAvailableTile(tile) {
    let parent_row = tile.parentElement;

    if (tile.nextSibling && tile.nextSibling.classList.contains("empty_tile")) {// right
        return tile.nextSibling;
    } else if (tile.previousSibling && tile.previousSibling.classList.contains("empty_tile")) {// left
        return tile.previousSibling;
    } else {
        rows = Array.from(puzzle_container.children);
        let rowIndex = getIndex(parent_row);

        if (rows[rowIndex - 1] && rows[rowIndex - 1].children && rows[rowIndex - 1].children[getIndex(tile)] &&
            rows[rowIndex - 1].children[getIndex(tile)].classList.contains("empty_tile")) {// up
            return rows[rowIndex - 1].children[getIndex(tile)];
        } else if (rows[rowIndex + 1] && rows[rowIndex + 1].children && rows[rowIndex + 1].children[getIndex(tile)] &&
            rows[rowIndex + 1].children[getIndex(tile)].classList.contains("empty_tile")) {// down
            return rows[rowIndex + 1].children[getIndex(tile)];
        } else {
            return false;
        }
    }
}

function moveTile(tile, empty_tile) {
    tile.classList.toggle("tile");
    tile.classList.toggle("empty_tile");

    empty_tile.classList.toggle("tile");
    empty_tile.classList.toggle("empty_tile");

    empty_tile.innerText = tile.innerText;
    tile.innerText = "";
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

function checkCompleted() {
    let nums = createNumArray();
    let tiles = puzzle_container.querySelectorAll("div");

    let isCompleted = Array.from(tiles).every((tile, index) => {
        console.log(tile.innerText);
        return tile.innerText == nums[index];
    });
    // every -> allows to check all of the elements in an array.
    // .foreach doesnt support return  

    if (isCompleted) {
        console.log("Completed")
        let empty = document.querySelector("empty_tile");
        empty.classList.toggle("empty_tile");
        empty.classList.toggle("tile");
        empty.innerText = (grid_size * grid_size);
        clearInterval(timer);
        return true;
    };
    return false;
};