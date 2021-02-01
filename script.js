const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false;
let isGameOver = false;
let position = 0
let score = 0

function handleKeyUp(event){
    if(!isJumping){
    if(event.keyCode === 32){
       jump()
    }
  }
}

function jump(){
    isJumping = true;

    let upInteval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInteval)
            
            //Descendo
            let dowInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(dowInterval)
                    isJumping = false;
                }else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 20)
        }else {
            //Subindo 
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20 )
}

function createCactus(){
   
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    if (isGameOver) return;

    cactus.classList.add('cactus')
    cactus.style.left = cactusPosition + 'px'
    background.appendChild(cactus)


    let leftInteval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInteval)
            background.removeChild(cactus)
            score++
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftInteval)
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo </h1>'+'<h2 class="game-over"> Score:'+ score +'</h2>'

        }else {
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 20)
    
    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keydown',handleKeyUp)


