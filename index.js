$(document).ready(() => {
    let currentLevel = 0;
    let isGameOver = false;
    const colorArr = ["green", "red", "yellow", "blue"];
    let path = [];
    let indexArr = 0; // Diziyi kontrol etmek için kullanılan değişken

    $(document).on("keydown", (e) => {
        if (currentLevel === 0) {
            currentLevel++;
            startGame();
        }
    });

    function restartGame() {
        currentLevel = 0;
        isGameOver = false;
        path = [];
        indexArr = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }

    function startGame() {
        $("#level-title").text(`Level ${currentLevel}`);
        pathCreator();
        effectBtn();
        console.log(path);
    }

    function levelUp() {
        currentLevel++;
        indexArr = 0;
        startGame();
    }

    function pathCreator() {
        let index = Math.floor(Math.random() * 4);
        path.push(colorArr[index]);
    }

    function effectBtn() {
        $(`#${path[path.length - 1]}`).addClass("pressed");
        var audio = new Audio(`./sounds/${path[path.length - 1]}.mp3`);
        audio.play();
        setTimeout(() => {
            $(`#${path[path.length - 1]}`).removeClass("pressed");
        }, 100);
    }
    function effectClick(key) {
        $(`#${key.target.id}`).addClass("pressed");
        var audio2 = new Audio(`./sounds/${key.target.id}.mp3`);
        audio2.play();
        setTimeout(() => {
            $(`#${key.target.id}`).removeClass("pressed");
        }, 100);
    }
    function effectGameOver() {
        $("body").addClass("game-over");
        var audio3 = new Audio(`./sounds/wrong.mp3`);
        audio3.play();
        setTimeout(() => {
            $(`body`).removeClass("game-over");
        }, 100);
    }

    $(".btn").on("click", (e) => {
        effectClick(e);
        if (!isGameOver) {
            const clickedColor = e.target.id;
            console.log(clickedColor);

            if (clickedColor === path[indexArr]) {
                indexArr++;
                if (indexArr === path.length) {
                    setTimeout(() => {
                        levelUp();
                    }, 1000);
                }
            } else {
                effectGameOver();
                isGameOver = true;
                $("#level-title").text(`Game Over, Press Any Key to Restart`);
                restartGame();
            }
        }
    });
});
