const context = {
    count: 0,
    isCircleTurn: true,
    progress: true,
    cells: new Array(9),
    cellElements: document.querySelectorAll(".js-cell"),
    circleElement: document.querySelector(".turn-item.circle"),
    crossElement: document.querySelector(".turn-item.cross"),
    stateMessageElement: document.querySelector(".js-state-message"),
    restartButtonElement: document.querySelector(".js-restart")
}

const WINNING_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
] 

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

function checkWinner(context) {
    // 1つでもWINNING_PATTERNS内の配列と一致すればtrueを返す
    return WINNING_PATTERNS.some(pattern => {
      const { cells } = context;
      // 1つ目の記号 ○ or ×
      const first = cells[pattern[0]];
      // 2つ目の記号 ○ or ×
      const second = cells[pattern[1]];
      // 3つ目の記号 ○ or ×
      const third = cells[pattern[2]];
            
      // WINNING_PATTERNのcellの1つ目=2つ目、1つ目=3つ目が全て ○ or × で一致した場合にtrueを返す
      return first && first === second && first === third;
    })
}

// 表内のクリック時
function onClickCell(e) {
    const { cells, progress, isCircleTurn, stateMessageElement, circleElement, crossElement } = context;
    const index = e.target.getAttribute("data-key") - 1;

    // cellに値が入っている、またはゲーム中の場合
    if(cells[index] || !progress) {
        return;
    }

    // ○×書き込み
    const value = isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross;
    e.target.innerHTML = value;
    cells[index] = value;

    // どちらかが勝った場合
    if(checkWinner(context)) {
        context.progress = false;
        const message = isCircleTurn ? STATUS.win.replace("%name%", CHARACTERS.circle) : STATUS.win.replace("%name%", CHARACTERS.cross);
        stateMessageElement.innerHTML = message;
        return;
    }

    // 引き分けの場合
    context.count++;
    if(context.count === 9) {
        context.progress = false;
        stateMessageElement.innerHTML = STATUS.draw;
        return;
    }

    // ターン変更
    toggleTurn(circleElement, crossElement);
    context.isCircleTurn = !isCircleTurn;
}

function subscribe() {
    context.stateMessageElement.innerHTML = STATUS.start;
    context.cellElements.forEach(item => {
        item.addEventListener("click", onClickCell)
    })
    context.restartButtonElement.addEventListener("click", () => location.reload());
}

subscribe();