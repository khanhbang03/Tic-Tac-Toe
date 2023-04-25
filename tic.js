function Run3() {
    turn = "X";
    document.write("<title>Tic Tac Toe</title>");
    document.write('<link rel="stylesheet" type="text/css" href="tic.css">');
    document.write("<h1>TIC TAC TOE</h1>");
    document.write('<p id="ins">First Player: <b>X</b><br>Second Player: <b>O</b></p>');
    
    size = 3;
    for (let i = 0; i < size; i++) {
        document.write("<br><br>");
        for (let j = 0; j < size; j++) {
            document.write('<input type="text" onclick="f(' + (i * size + j).toString() + '); check(3)" readonly>');
        }
    }

    document.write("<br><br><br>");
    document.write('<button onclick="restart()">RESTART</button>');
    document.write("<br><br>");
    document.write('<p id="print"></p>');
}

function Run5() {
    turn = "X";
    document.write("<title>Tic Tac Toe</title>");
    document.write('<link rel="stylesheet" type="text/css" href="tic.css">');
    document.write("<h1>TIC TAC TOE</h1>");
    document.write('<p id="ins">First Player: <b>X</b><br>Second Player: <b>O</b></p>');
    
    size = 10;
    for (let i = 0; i < size; i++) {
        document.write("<br><br>");
        for (let j = 0; j < size; j++) {
            document.write('<input type="text" onclick="f(' + (i * size + j).toString() + '); check(5)" readonly>');
        }
    }

    document.write("<br><br><br>");
    document.write('<button onclick="restart()">RESTART</button>');
    document.write("<br><br>");
    document.write('<p id="print"></p>');
}

box = document.getElementsByTagName("input");

// The computer tries to win whenever possible
function win(n, p) {
    if (n == 3) {
        // check for 3 in a row
        var w = (a, b, c) => {
            a = box[a];
            b = box[b];
            c = box[c];
            if (a.value + b.value + c.value == p + p + p) {
                a.style.color = b.style.color = c.style.color = "blue";
                return true;
            }
        };
        if (
            w(0, 1, 2) ||
            w(3, 4, 5) ||
            w(6, 7, 8) ||
            w(0, 3, 6) || w(1, 4, 7) || w(2, 5, 8) ||
            w(0, 4, 8) || w(2, 4, 6)
        ) {
            return true;
        }
    } else {
        var w5 = (a, b, c, d, e) => {
            a = box[a[0] * size + a[1]];
            b = box[b[0] * size + b[1]];
            c = box[c[0] * size + c[1]];
            d = box[d[0] * size + d[1]];
            e = box[e[0] * size + e[1]];
            if (a.value + b.value + c.value + d.value + e.value == p + p + p + p + p) {
                a.style.color = b.style.color = c.style.color = d.style.color = e.style.color = "red";
                return true;
            }
        };
        // horizontal
        for (let i = 0; i < size; i++) {
            for (let j = 0; j + 4 < size; j++) {
                if (w5([i, j], [i, j + 1], [i, j + 2], [i, j + 3], [i, j + 4])) {
                    return true;
                }
            }
        }
        // vertical
        for (let i = 0; i + 4 < size; i++) {
            for (let j = 0; j < size; j++) {
                if (w5([i, j], [i + 1, j], [i + 2, j], [i + 3, j], [i + 4, j])) {
                    return true;
                }   
            }
        }
        // primary diagonal
        for (let i = 0; i + 4 < size; i++) {
            for (let j = 0; j + 4 < size; j++) {
                if (w5([i, j],[i + 1, j + 1],[i + 2, j + 2],[i + 3, j + 3],[i + 4, j + 4])) {
                    return true;
                }
            }
        }
        // secondary diagonal
        for (let i = 0; i + 4 < size; i++) {
            for (let j = 4; j < size; j++) {
                if (w5([i, j],[i + 1, j - 1],[i + 2, j - 2],[i + 3, j - 3],[i + 4, j - 4])) {
                    return true;
                }
            }
        }
    }
}

function tie() {
    // table is fully filled
    sum = 0;
    for (let i = 0; i < size * size; i++) {
        sum += box[i].value.length;
    }
    if (sum == size * size) {
        return true;
    }
    return false;
}

function disable() {
    for (let i in box) {
        box[i].disabled = true;
    }
}

function print(data) {
    document.getElementById("print").innerHTML = data;
}

function check(n) {
    if (tie()) {
        disable();
        print("Match tie");
        window.alert("Match tie");
    } else if (turn == "X") {
        print("Player X Turn");
    } else {
        print("Player O Turn");
    }

    // try every possible move to see if the current player can win
    for (let move = 0; move < size * size; move++) {
        if (box[move].value == "") {
            // trial move
            box[move].value = turn;
            if (win(n, "X")) {
                disable();
                print("Player X won");
                window.alert("Player X won");
                return;
            }
            if (win(n, "O")) {
                disable();
                print("Player O won");
                window.alert("Player O won");
                return;
            }
            // reset trial move
            box[move].value = "";
        }
    }
}

function f(n) {
    if (turn == "X") {
        box[n].value = "X";
        box[n].disabled = true;
        turn = "O";
    } else {
        box[n].value = "O";
        box[n].disabled = true;
        turn = "X";
    }
}

function restart() {
    location.reload();
}
