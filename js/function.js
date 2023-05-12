const context = {
    isCircleTurn: true,
    progress: true,
    cells: new Array(9),
    cellElements: document.querySelectorAll(".js-cell"),
    circleElement: document.querySelector(".turn-item.circle"),
    crossElement: document.querySelector(".turn-item.cross"),
    stateMessageElement: document.querySelector(".js-state-message"),
    restartButtonElement: document.querySelector(".js-restart")
}

const ACTIVE_CLASSNAME = "active";

// メッセージ
const STATUS = {
    start: "starting...",
    win: "%name% win!!",
    draw: "draw" 
}
const CHARACTERS = {
    circle: "○",
    cross: "×"
}

function toggleTurn(circleElement, crossElement) {
    circleElement.classList.toggle(ACTIVE_CLASSNAME);
    crossElement.classList.toggle(ACTIVE_CLASSNAME);
}

function onClickCell(e) {
    const {cells, progress, isCircleTurn} = context;
    const index = e.target.getAttribute("data-key") - 1;

    console.log(index);

    // cellに値が入っている、またはゲーム中の場合
    if(cells[index] || !progress) {
        return;
    }

    // ○×書き込み
    const value = isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross;
    e.target.innerHTML = value;
    cells[index] = value;

    // ターン変更
    toggleTurn(context.circleElement, context.crossElement);
    context.isCircleTurn = !context.isCircleTurn;
}

function subscribe() {
    context.cellElements.forEach(item => {
        item.addEventListener("click", onClickCell)
    })
}

subscribe();