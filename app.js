const app =()=>{
const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const time = document.querySelectorAll('#time button')
// sounds
const sounds = document.querySelectorAll('#player button')
const timedisplay = document.querySelector('.time-display')
let change  = document.querySelectorAll('.change')
const outlineLength = outline.getTotalLength();

// duration 
let dur = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

time.forEach(option=>{
    option.addEventListener('click',function(){
        dur=this.getAttribute('data-time');
        timedisplay.textContent=`${Math.floor(dur/60)}:${Math.floor(dur%60)} `;
    })
})

// play sound

play.addEventListener('click',()=>{
    checkPlaying(song);
})
const checkPlaying = song  =>{
    if(song.paused){
        song.play();
        play.src="./imges/pause.svg";
    }
    else{
        song.pause();
        play.src='./imges/play.svg';
    }
};
song.ontimeupdate=()=>{
    let currentTime = song.currentTime;
    let elapsed = dur - currentTime;
    let seconds = Math.floor(elapsed%60);
    let minutes = Math.floor(elapsed /60);

    let progress = outlineLength - (currentTime / dur )* outlineLength;
    outline.style.strokeDashoffset = progress;
    // animating text
    timedisplay.textContent=`${minutes}:${seconds}`

    if(currentTime>=dur){
        song.pause();
        song.currentTime = 0;
        play.src='./imges/play.svg';

    }
}



}


app();