(function () {
    var canvas = document.querySelector("#canvas")
    var context = canvas.getContext('2d')
    const CELL_W = 4
    const CELL_H = 4
    const BOARD_W = 250
    const BOARD_H = 120

    var cells = new Array(BOARD_H + 2)
    for (var y = 0; y < BOARD_H + 2; y++) {
        cells[y] = (new Array(BOARD_W + 2)).fill(0)
    }

    var pattern = [
        "0011000000",
        "1001000000",
        "1101011000",
        "0101001000",
        "0100001011",
        "0011101011",
        "0000010000",
        "0000100000",
        "0000110000",
    ]

    var pattern1 = [
        "111",
        "100",
        "010",
    ]

    var pattern = [ // aitforce
        "00000001000000",
        "00000010100000",
        "00000001000000",
        "00000000000000",
        "00000111110000",
        "00001000001011",
        "00010110001011",
        "00010100101000",
        "11010001101000",
        "11010000010000",
        "00001111100000",
        "00000000000000",
        "00000010000000",
        "00000101000000",
        "00000010000000",
    ]

    var pattern = [ // cross
        "00111100",
        "00100100",
        "11100111",
        "10000001",
        "10000001",
        "11100111",
        "00100100",
        "00111100",
    ]

    var pattern = [ // LIFEGAME
        "100001110111101111001100011001000101111",
        "100000100100001000010010100101101101000",
        "100000100100001000010000100101010101000",
        "100000100111101111010110111101010101111",
        "100000100100001000010010100101010101000",
        "100000100100001000010010100101010101000",
        "100000100100001000010010100101010101000",
        "111101110100001111001110100101010101111",
    ]

    var base_y = Math.ceil(BOARD_H / 2 - pattern.length / 2)
    var base_x = Math.ceil(BOARD_W / 2 - pattern[0].length / 2)

    for (var y = 0; y < pattern.length; y++) {
        for (var x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x] == "1") {
                cells[y + base_y][x + base_x] = 1
            }
        }
    }

    for (var y = 1; y <= BOARD_H; y++) {
        for (var x = 1; x <= BOARD_W; x++) {
            if (Math.random() > 0.5) {
                cells[y][x] = 1
            }
        }
    }

    context.fillStyle = "rgb(32, 32, 32)"
    context.fillRect(0, 0, CELL_W * BOARD_W + 1, CELL_H * BOARD_H + 1)

    var paint = function () {
        context.fillStyle = "rgb(0, 0, 0)"
        for (var y = 0; y < BOARD_H; y++) {
            for (var x = 0; x < BOARD_W; x++) {
                if (cells[y + 1][x + 1]) {
                    context.fillStyle = "rgb(100, 255, 100)"
                } else {
                    context.fillStyle = "rgb(0, 0, 0)"
                }
                context.fillRect(x * CELL_W + 1, y * CELL_H + 1, CELL_W - 1, CELL_H - 1)
            }
        }
    }

    var process = function () {
        var neighbors = new Array(BOARD_H + 2)
        for (var y = 0; y < BOARD_H + 2; y++) {
            neighbors[y] = (new Array(BOARD_W + 2)).fill(0)
        }
        for (var y = 1; y <= BOARD_H; y++) {
            for (var x = 1; x <= BOARD_W; x++) {
                n = 0
                n += cells[y - 1][x - 1]
                n += cells[y - 1][x]
                n += cells[y - 1][x + 1]
                n += cells[y][x - 1]
                n += cells[y][x + 1]
                n += cells[y + 1][x - 1]
                n += cells[y + 1][x]
                n += cells[y + 1][x + 1]
                neighbors[y][x] = n
            }
        }
        for (var y = 1; y <= BOARD_H; y++) {
            for (var x = 1; x <= BOARD_W; x++) {
                n = neighbors[y][x]
                if ((n == 3) || (cells[y][x] == 1 && n == 2)) {
                    cells[y][x] = 1
                } else {
                    cells[y][x] = 0
                }
            }
        }
    }

    paint()
    process()

    setTimeout(function () {
        setInterval(function () {
            paint()
            process()
        }, 250)
    }, 1000)


    /*
    paint()
    process()
    paint()
    process()
    */

})()