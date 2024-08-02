// khai bao constant
const cols = 10;
const rows = 20;
const block_size = 30;
const color_mapping = [
    'red', 'orange', 'green', 'purple', 'blue', 'cyan', 'yellow', 'white'
]
const brick_layout = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],

];

const key_codes = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',

};

const white_color_id = 7;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = cols * block_size;
ctx.canvas.height = rows * block_size;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
        this.clearAudio = new Audio('./sounds')
    }

    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard();

    }

    generateWhiteBoard() {
        return Array.from({ length: rows }, () => Array(cols).fill(white_color_id));
    }

    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = color_mapping[colorId] || color_mapping[white_color_id]
        this.ctx.fillRect(xAxis * block_size, yAxis * block_size, block_size, block_size)
        this.ctx.fillStyle = 'black'
        this.ctx.strokeRect(xAxis * block_size, yAxis * block_size, block_size, block_size)
    }

    // vẽ đường viền của bảng
    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    // phương thức kiểm tra hàng đã được hoàn thành chưa
    handleCompleteRows() {
        const latestGrid = board.grid.filter((row) => {
            return row.some(col => col === white_color_id)
        });

        const newScore = rows - latestGrid.length; // tổng số hàng trừ đi hàng có ô màu trắng = số điểm mới
        const newRows = Array.from({ length: newScore }, () => Array(cols).fill(white_color_id))

        if (newScore) {
            board.grid = [...newRows, ...latestGrid]
            this.handleScore(newScore * 10);
            this.clearAudio.play();
            console.log({ latestGrid });
        }
    }

    handleScore(newScore) {
        this.score += newScore;
        document.getElementById('score').innerHTML = this.score;
    }

    

    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false
        showCustomAlert();
    }
}

function showCustomAlert() {
    var customTitle = "Huấn Tồ nói";
    var alertMessage = "meo meo";

    // Combine custom title and message using line breaks
    var alertContent = customTitle + "\n\n" + alertMessage;

    // Show the alert with the custom content
    alert(alertContent);
}



class Brick {
    constructor(id) {
        this.id = id;
        this.layout = brick_layout[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2;
    }
    // vẽ khối
    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== white_color_id) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id)
                }
            }
        }
    }
    // xóa vị trí cũ của khối sau khi di chuyển
    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== white_color_id) {
                    board.drawCell(col + this.colPos, row + this.rowPos, white_color_id)
                }
            }
        }
    }

    // phím trái
    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    // phím phải
    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    // phím dưới
    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();

            return;
        }

        this.handleLanded();
        if (!board.gameOver) {
            generateNewBrick();
        }
    }
    // phím trên
    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    // kiểm tra xem đã vượt qua giới hạn hay chưa
    checkCollision(nextRow, nextCol, nextLayout) {
        // if (nextCol < 0) return true;

        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== white_color_id && nextRow >= 0) {
                    if ((col + nextCol < 0) || (col + nextCol >= cols) || (row + nextRow >= rows) ||
                        board.grid[row + nextRow][col + nextCol] !== white_color_id) return true;
                }
            }
        }

        return false;
    }

    // kiểm tra đã chạm đáy hoặc va chạm với viên gạch khác
    handleLanded() {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== white_color_id) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id
                }
            }
        }
        board.handleCompleteRows();
        board.drawBoard();
    }

}

// Viết hàm tạo gạch ngẫu nhiên rơi sau 1s
function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random() * 10) % brick_layout.length); // tạo ra id ngẫu nhiên từ 1 - 6
}



board = new Board(ctx);
board.drawBoard();
generateNewBrick();

// sụ kiện click vào nút play
document.getElementById('play').addEventListener('click', () => {
    board.reset();
    board.isPlaying = true;
    generateNewBrick();
    const refresh = setInterval(() => {
        if (!board.gameOver) {
            brick.moveDown();
        } else {
            clearInterval(refresh);
        }
    }, 1000);
})






// cho biết bạn bấm phím nào
document.addEventListener('keydown', (e) => {
    if (!board.gameOver && board.isPlaying) {
        console.log({ e });
        switch (e.code) {
            case key_codes.LEFT:
                brick.moveLeft();
                break;
            case key_codes.RIGHT:
                brick.moveRight();
                break;
            case key_codes.DOWN:
                brick.moveDown();
                break;
            case key_codes.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }

});



// brick.moveDown()
// board.drawCell(1,1, 1)
console.table(board.grid);