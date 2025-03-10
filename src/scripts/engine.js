const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lifeJogo: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0 || state.values.lifeJogo === 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        CloseEvent
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumer = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumer];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }else if(square.id !== state.values.hitPosition){
                state.values.lifeJogo--
                state.view.life.textContent = state.values.lifeJogo;
            }

        })
    })

}

function init(){
    addListenerHitBox();
}


init();