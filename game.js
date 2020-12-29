function Cell(row, col, seg, display) {
    this.val = null;
    this.row = row;
    this.col = col;
    this.segment = seg;
    this.display = document.getElementById(display);
}

Cell.prototype.update = function(val) {
    if (val == 10){
        this.val = 0;
        this.display.textContent = '?'
    } else {
    this.val = val;
    this.display.textContent = val;
    }
}

function updateCell(id){
    rowval = id[3]
    colval = id[7]
    let cell = window.grid.find(cell => cell.row == rowval && cell.col == colval);
    cell.update(curr_value);
}

let curr_value = 1;
window.grid = [];
function initialize() {
    let board = document.getElementById("gameboard");
    for (var i = 0; i < 9; i++){
        var row = board.insertRow(-1);
        for (var j = 0; j < 9; j++) {
            var cell = row.insertCell(-1);
            let id = "row" + i.toString() + "col" + j.toString()
            cell.setAttribute("id", id)
            cell.setAttribute("class", "text-center")
            cell.setAttribute("onclick", "updateCell('"+id+"')")
            if (i == 2 || i == 5){
                cell.className += " " + "horizontal";
            }
            if (j == 2 || j == 5){
                cell.className += " " + "vertical";
            }
            let seg = 0;
            if (i <=2){
                if (j <= 2){
                    seg = 1
                } else if (3 <= j && j <= 5){
                    seg = 2
                } else {
                    seg = 3
                }
            } else if (3 <= i && i <= 5){
                if (j <= 2){
                    seg = 4
                } else if (3 <= j && j <= 5){
                    seg = 5
                } else {
                    seg = 6
                }
            } else {
                if (j <= 2){
                    seg = 7
                } else if (3 <= j && j <= 5){
                    seg = 8
                } else {
                    seg = 9
                }
            }
            window.grid.push(new Cell(i, j, seg, cell.id));
        }
    }
    for (var i = 1; i < 11; i++){
        btn = document.getElementById("option".concat(i.toString()));
        buttonHandler(btn, i);
    }
    resetGame();
    document.getElementById("checksoln").addEventListener("click", function(event){
        checkSolution();
        event.preventDefault;
    })
    document.getElementById("autocomplete").addEventListener("click", function(event){
        showSolution();
        event.preventDefault;
    })
    document.getElementById("reset").addEventListener("click", function(event){
        resetGame();
        event.preventDefault;
    })
    document.getElementById("clear").addEventListener("click", function(event){
        clearGame();
        event.preventDefault;
    })
};

function makeGameBoard() {
    var arr = new Array(9);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(9);
      for (var j = 0; j < arr.length; j++) {
          arr[i][j] = new Cell(j, i)
      }
    }
    return arr;
  }


function buttonHandler(btn, option) {
    btn.onclick = function(){
        curr_value = option;
    }
}

function checkSolution(){
    for (let i = 0; i < 9; i++){
        let validrow = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let row = window.grid.filter(cell => cell.row == i);
        for (var entry in row){
            let val = row[entry].val
            let index = validrow.indexOf(val)
            if (index >= 0){
                validrow.splice(index, 1);
            } else {
                window.alert("Invalid Solution.")
                return;
            }
        }
    }
    for (let i = 0; i < 9; i++){
        let validcol = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let column = window.grid.filter(cell => cell.col == i);
        for (var entry in column){
            let val = column[entry].val
            let index = validcol.indexOf(val)
            if (index >= 0){
                validcol.splice(index, 1);
            } else {
                window.alert("Invalid Solution.")
                return;
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        let validseg = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let segment = window.grid.filter(cell => cell.seg == i+1);
        for (var entry in segment){
            let val = segment[entry].val
            let index = validseg.indexOf(val)
            if (index >= 0){
                validseg.splice(index, 1);
            } else {
                window.alert("Invalid Solution.")
                return;
            }
        }
    }
    window.alert("Solution is Valid!")
}

function showSolution(){
    clearGame()
    var solvedGame = {'00':5, '01':3, '02':4, '03':6, '04':7, '05':8, '06':9, '07':1, '08':2, 
    '10':6, '11':7, '12':2, '13':1, '14':9, '15':5, '16':3, '17':4, '18':8, 
    '20':1, '21':9, '22':8, '23':3, '24':4, '25':2, '26':5, '27':6, '28':7, 
    '30':8, '31':5, '32':9, '33':7, '34':6, '35':1, '36':4, '37':2, '38':3, 
    '40':4, '41':2, '42':6, '43':8, '44':5, '45':3, '46':7, '47':9, '48':1, 
    '50':7, '51':1, '52':3, '53':9, '54':2, '55':4, '56':8, '57':5, '58':6, 
    '60':9, '61':6, '62':1, '63':5, '64':3, '65':7, '66':2, '67':8, '68':4, 
    '70':2, '71':8, '72':7, '73':4, '74':1, '75':9, '76':6, '77':3, '78':5, 
    '80':3, '81':4, '82':5, '83':2, '84':8, '85':6, '86':1, '87':7, '88':9}
    for (var key in solvedGame){
        let rowval = key[0];
        let colval = key[1];
        let cell = window.grid.find(cell => cell.row == rowval && cell.col == colval);
        cell.update(solvedGame[key]);
    }
}

function resetGame(){
    clearGame()
    var baseGame = {'00':5, '01':3, '04':7, 
    '10':6, '13':1, '14':9, '15':5,
    '21':9, '22':8, '27':6, 
    '30':8, '34':6, '38':3, 
    '40':4, '43':8, '45':3, '48':1, 
    '50':7, '54':2, '58':6, 
    '61':6, '66':2, '67':8,
    '73':4, '74':1, '75':9, '78':5, 
    '84':8, '87':7, '88':9}
    for (var key in baseGame){
        let rowval = key[0];
        let colval = key[1];
        let cell = window.grid.find(cell => cell.row == rowval && cell.col == colval);
        cell.update(baseGame[key]);
    }
    
}

function clearGame(){
    for (let i = 0; i < window.grid.length; i++){
        window.grid[i].update('')
    }
}
