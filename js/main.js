import Tetris from "../js/tetris.js";
import Tetromino from "../js/tetromino.js";

const delayTime = 85;

let tetris = null;
let keyDownTimerID = [
    [],
    [],
    []
];

let buttonDownTimerID = [
    [],
    [],
    []
];


let isFired = [false, false, false];
let xDown = null;
let yDown = null;
let isLightTheme = false;
// let bot = new Tetris(canvas.getContext('2d'), canvas.width, canvas.height, true); // maybe bot in the future
// let botIsStarted = false;

const body = document.getElementById('_body');
const backs = document.getElementById('backs');
const control = document.getElementById('control');
const canvas = document.getElementById('game_field');
const helpModal = document.querySelector("#help_modal");
const settingsModal = document.querySelector('#settings_modal');
const highscoreModal = document.querySelector('#highscore_modal');
const helpPCText = document.getElementById('pc_help_text');
const helpMobileText = document.getElementById('mobile_help_text');


/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/web_tetris/appCache.js')
        .then(function() { console.log("Service Worker Registered"); });
} */

window.addEventListener('beforeunload', (event) => {
    //event.preventDefault();
    //cache();
    //event.returnValue = '';

});

window.mobileCheck = () => {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.getElementById('close_help_modal').addEventListener('click', closeHelpModel, false);
document.getElementById('close_highscore_modal').addEventListener('click', closeHighscoreModal, false);
document.getElementById('submit_btn').addEventListener('click', startBtnClick, false);


//document.getElementById('start').addEventListener('click', startGame);;


function cache() {
   // localStorage.setItem('tetris', JSON.stringify(tetris));
    //localStorage.setItem('currentTetromino', JSON.stringify(tetris.currentTetromino));
    //localStorage.setItem('nextTetromino', JSON.stringify(tetris.nextTetromino));
    // localStorage.clear();
}


let leftMoveTimerID;
$('#left_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.move(-1, 0);
    $(this).addClass('pushed');
    $(this).removeClass('border');
    leftMoveTimerID = setInterval(() => {
        tetris.move(-1, 0);
    }, delayTime);
    buttonDownTimerID[0].push(leftMoveTimerID);
}).bind('touchend', () => {
    // clearInterval(leftMoveTimerID);
    buttonDownTimerID[0].forEach(el => {
        clearInterval(el);
    })
    buttonDownTimerID[0] = [];
    $('#left_button').removeClass('pushed');
    $('#left_button').addClass('border')
});

let rightMoveTimerID;
$('#right_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.move(1, 0);
    $(this).addClass('pushed');
    $(this).removeClass('border');
    rightMoveTimerID = setInterval(() => {
        tetris.move(1, 0);
    }, delayTime);
    buttonDownTimerID[1].push(rightMoveTimerID);
}).bind('touchend', () => {
    // clearInterval(rightMoveTimerID);
    buttonDownTimerID[1].forEach(el => {
        clearInterval(el);
    });
    buttonDownTimerID[1] = [];
    $('#right_button').removeClass('pushed');
    $('#right_button').addClass('border')
});

let downMoveTimerID;
$('#down_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.move(0, 1);
    $(this).addClass('pushed');
    $(this).removeClass('border');
    downMoveTimerID = setInterval(() => {
        tetris.move(0, 1);
    }, delayTime);
    buttonDownTimerID[2].push(downMoveTimerID);
}).bind('touchend', () => {
    // clearInterval(downMoveTimerID);
    buttonDownTimerID[2].forEach(el => {
        clearInterval(el);
    })
    buttonDownTimerID[2] = [];
    $('#down_button').removeClass('pushed');
    $('#down_button').addClass('border')
});

let hardDropTimerId;
$('#harddrop_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.hardDrop();
    $(this).addClass('pushed');
    $(this).removeClass('border');

    if (hardDropTimerId)
        clearTimeout(hardDropTimerId);

    hardDropTimerId = setTimeout(() => {
        $('#harddrop_button').removeClass('pushed');
        $('#harddrop_button').addClass('border');
        hardDropTimerId = null;
    }, delayTime);
});

let rotateCounterWiseTimerId;
$('#counterclockwise_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.rotate(false);
    $(this).addClass('pushed');
    $(this).removeClass('border');

    if (rotateCounterWiseTimerId)
        clearTimeout(rotateCounterWiseTimerId);

    setTimeout(() => {
        $('#counterclockwise_button').removeClass('pushed');
        $('#counterclockwise_button').addClass('border');
        rotateCounterWiseTimerId = null;
    }, delayTime);
});

let clockWiseTimerID;
$('#clockwise_button').on('touchstart', function(e) {
    e.preventDefault();
    tetris.rotate(true);
    $(this).addClass('pushed');
    $(this).removeClass('border');

    if (clockWiseTimerID)
        clearTimeout(clockWiseTimerID);

    setTimeout(() => {
        $('#clockwise_button').removeClass('pushed');
        $('#clockwise_button').addClass('border');
        clockWiseTimerID = null;
    }, delayTime);
});

canvas.onselectstart = () => { return false; }

window.addEventListener('load', () => {

    
    var nome = window.localStorage.getItem('nome');
    var toprecord = window.localStorage.getItem('highScore');
    console.log("Dati salvati in memoria => " + nome + ":" + toprecord);


    if(nome != null){
        var nometornato = document.getElementById('backuser');
        nometornato.innerHTML = nome;
        var recordtornato = document.getElementById('record');
        recordtornato.innerHTML = toprecord;
        document.getElementById('name').value=nome;
        document.getElementById('esistente').style.visibility = 'visible';
        document.getElementById('esistente').style.maxHeight = '10000px';
    }else{
        document.getElementById('nuovo').style.visibility = 'visible';
        document.getElementById('nuovo').style.maxHeight = '10000px';
    }

    console.log('Tutti gli asset sono stati caricati correttamente.');
    setLightTheme();
    // QUAINIZIA 
    //start();
})



window.addEventListener('resize', (event) => {
    setSize();
    buttonDownTimerID.forEach(el => {
        el.forEach(elNext => {
            clearInterval(elNext);
        })
    });
    buttonDownTimerID = [
        [],
        [],
        [],
    ]
}, true);



function switchTheme() {

    if (isLightTheme) {
        setLightTheme();
    } else {
        setLightTheme();
    }

    localStorage.setItem('isLightTheme', isLightTheme);
}

function setDarkTheme() {
    $('#bg').addClass('darkTheme');
    $('#labels').addClass('darkTheme');
    $('#settings').addClass('darkTheme');
    $('#settings_modal').addClass('darkTheme');
    isLightTheme = false;
}

function setLightTheme() {
    $('#bg').removeClass('darkTheme');
    $('#labels').removeClass('darkTheme');
    $('#settings').removeClass('darkTheme');
    $('#settings_modal').removeClass('darkTheme');
    isLightTheme = true;
}

function mouseOverMusicLine() {
    if (tetris.isTouchableDevice)
        return;

    $('#music_line').css('transform', 'scale(1.3,1.3)');
}

function mouseOutMusicLine() {
    if (tetris.isTouchableDevice)
        return;
    $('#music_line').css('transform', 'scale(1,1)');
}

function pauseResumeMusic() {
    // if (tetris.isDisableSound) {
    //     $('#music_line').css('visibility', 'hidden');
    //     tetris.isDisableSound = false;
    //     tetris.resumeBackgroundAudio();
    // } else {
    //     // this.style.backgroundImage = "url('./img/music-off.svg')";
    //     $('#music_line').css('visibility', 'visible');
    //     tetris.isDisableSound = true;
    //     tetris.stopBackgroundAudio();
    // }

    tetris.changePausedStatus();
    highscoreModal.showModal();

}

//function startGame(){
//    start();
//}

function fullScreen() {
    console.log(canvas.requestFullscreen)
    if (canvas.requestFullscreen) {
        body.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
        body.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
        body.msRequestFullscreen();
    }
}


function checkMoves() {
    if (isFired[0])
        tetris.move(0, 1);
    if (isFired[1])
        tetris.move(-1, 0);
    if (isFired[2])
        tetris.move(1, 0);
}


function start() {
    console.log('start');

    // document.getElementById('bg').style.backgroundImage = `url('https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-${Math.floor(Math.random() * 33)+1}.svg')`;
    let isTouchableDevice = false;

    tetris = new Tetris(canvas, canvas.width, canvas.height);

    // isTouchableDevice = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    isTouchableDevice = window.mobileCheck();
    console.log("is touchable device:", isTouchableDevice);
    if (isTouchableDevice) {
        tetris.isTouchableDevice = true;
        tetris.helpText = Tetris.MOBILE_HELP_TEXT;
        control.style.visibility = 'visible';
        helpMobileText.style.display = 'inline';
    } else {
        helpPCText.style.display = 'inline';
    }

    // bot.isTouchableDevice = isTouchableDevice;
    tetris.changeActive();
    setSize();
    tetris.start();
    setInterval(checkMoves, 75);
    loadCashes();
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('night').style.visibility = 'visible';
    document.getElementById('night2').style.visibility = 'visible';
    document.getElementById('quadrati').style.visibility = 'visible';
    document.getElementById('buttons').style.visibility = 'invisible';
    document.getElementById('labels').style.visibility = 'visible';
    backs.style.visibility = 'visible';
    // backs.style.opacity = 0.85;
    document.getElementById('yourAudioTag').play();


    // bot.start();
}

// function moveLeft() {
//     tetris.move(-1, 0);
// }

function loadCashes() {
    let isLightThemeCasched = JSON.parse(localStorage.getItem('isLightTheme'));
    if (isLightThemeCasched) {
        setLightTheme();
    }

    let cachedTetris = JSON.parse(localStorage.getItem('tetris'));
    if (!cachedTetris) {
        return;
    }


    tetris.score = cachedTetris.score;
    tetris.line = cachedTetris.line;
    tetris.boardMatrix = cachedTetris.boardMatrix;
    tetris.matrixOfColors = cachedTetris.matrixOfColors;
    tetris.currentSpeed = cachedTetris.currentSpeed;

    let cachedCurrentTetromino = JSON.parse(localStorage.getItem('currentTetromino'));
    let cachedNextTetromino = JSON.parse(localStorage.getItem('nextTetromino'));

    if (cachedCurrentTetromino) {
        tetris.currentTetromino = new Tetromino(
            tetris.currentTetromino.tetromino = cachedCurrentTetromino.tetromino,
            tetris.currentTetromino.x = cachedCurrentTetromino.x,
            tetris.currentTetromino.y = cachedCurrentTetromino.y,
            tetris.currentTetromino.color = cachedCurrentTetromino.color,
            tetris.currentTetromino.colorID = cachedCurrentTetromino.colorID

        );
    }

    if (cachedNextTetromino) {
        tetris.nextTetromino = new Tetromino(
            tetris.nextTetromino.tetromino = cachedNextTetromino.tetromino,
            tetris.nextTetromino.x = cachedNextTetromino.x,
            tetris.nextTetromino.y = cachedNextTetromino.y,
            tetris.nextTetromino.color = cachedNextTetromino.color,
            tetris.nextTetromino.colorID = cachedNextTetromino.colorID

        );
    }





    console.log('cache', tetris.currentSpeed);
}


function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ratio = Math.ceil(window.devicePixelRatio);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    tetris.setSize(canvas.width, canvas.height);
    tetris.setButtons();
    tetris.setLabels();

    // bot.setSize(canvas.width, canvas.height);
    // bot.setButtons();
}


function showHelp() {
    tetris.changePausedStatus();
    setTimeout(() => {
        // if (confirm(tetris.helpText)) {
        //     tetris.changePausedStatus();
        //     // if (!isFullScreen)
        //     // fullScreen();
        // }
        helpModal.showModal();
        // settingsModal.showModal();

    }, 85);
}

function closeHelpModel() {
    helpModal.close();
    // settingsModal.close();
    tetris.changePausedStatus();
}

function closeHighscoreModal() {
    highscoreModal.close();
    tetris.changePausedStatus();
}

function startBtnClick(){
    var text=document.getElementById('name');
    if( document.getElementById("name").value != ''){
        // Nome inserito, controllo necessario
        controlloUtente();
    }else{
        // Nessun nome, partita locale
        var highScore = 0;
        window.localStorage.setItem('highScore', highScore);
        window.localStorage.removeItem('nome');
        console.log("Nessun nome, record generico di  ", highScore);
    }
    start();
}

async function controlloUtente(){
    var text=document.getElementById('name');
    window.localStorage.setItem('nome', text.value);
    var migliore = "0";
    var highScore = "0";
    const query = await db.collection("players3").where("name", "==", text.value).get();
  
    if (!query.empty) {
        const snapshot = query.docs[0];
        const data = snapshot.data();
        let migliore  = `${data.score}`;
        var highScore = migliore;
        console.log("Vecchio utente, assegno punteggio ", highScore);
        window.localStorage.setItem('highScore', highScore);
        console.log(highScore);
        console.log(data);
    } else {
        var highScore = 0;
        window.localStorage.setItem('highScore', highScore);
        console.log("Nuovo utente, assegno punteggio ", highScore);
    }  
}













function getTouches(evt) {
y
}

function handleTouchStart(event) {

};

function clearButtonsIntervals(container, keys = false) {
    if (keys) {
        for (let i = 0; i < container.length; i++) {
            clearInterval(container[i]);
        }
        return;
    }
    for (let i = 0; i < container.length; i++) {
        clearInterval(container[i].timerID);
    }
}



function handleTouchMove(event) {

};