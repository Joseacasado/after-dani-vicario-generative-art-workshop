/** @type HTMLCanvasElement */
const canvas = document.getElementById('canvas')

/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext('2d')

const w = window.innerWidth
const h = window.innerHeight

const w2 = w / 2
const h2 = h / 2

const { PI } = Math
const PI_DOUBLE = 2 * PI
const PI_HALF = PI / 2

canvas.setAttribute('width', w)
canvas.setAttribute('height', h)

ctx.save()

const clearCanvas = () => ctx.clearRect(0, 0, w, h)

const drawPoligon = (width, sides) => {
    const positions = []

    for (let iteration = 1; iteration <= sides; iteration++) {
        const angle = 360 / sides

        positions.push({
            x: width * Math.cos((angle * iteration * PI) / 180),
            y: width * Math.sin((angle * iteration * PI) / 180)
        })
    }

    ctx.strokeStyle = `rgba(${randomInt(100, 225)}, ${randomInt(100, 225)}, ${randomInt(100, 225)}, ${randomFloat(0, 1)})`
    ctx.beginPath()
    ctx.moveTo(positions[0].x, positions[0].y)

    for (let i = 0; i <= positions.length - 1; i++) {
        ctx.lineTo(positions[i].x, positions[i].y)
    }

    ctx.lineTo(positions[0].x, positions[0].y)
    ctx.stroke()
    ctx.closePath()
}

const drawBackground = (minWidth, maxWidth, poligonSides) => {
    for (let posX = 0; posX < 20; posX++) {
        for (let posY = 0; posY < 20; posY++) {
            ctx.save()

            if (posY % 2) {
                ctx.translate(posX * (maxWidth + 100), posY * 175)
            } else {
                ctx.translate(posX * (maxWidth + 100) + 100, posY * 175)
            }

            drawPoligon(randomInt(minWidth, maxWidth), poligonSides)
            ctx.restore()
        }
    }
}

const drawSpiral = (smallCirclesRadii, angleInc, laps) => {
    let inc = 0
    let angle = 0

    const colorPalette = paletteArr[randomInt(0, paletteArr.length)]

    const posX = randomInt(100, w - 100)
    const posY = randomInt(100, h - 200)

    const spiralInterval = setInterval(() => {
        inc += 1
        angle += angleInc
    
        ctx.beginPath()
        ctx.arc(
            0 + inc * Math.cos((angle * PI) / 180) + posX,
            0 + inc * Math.sin((angle * PI) / 180) + posY,
            smallCirclesRadii + randomFloat(0, 10),
            0,
            PI_DOUBLE
        )
        ctx.fillStyle = colorPalette
            ?   colorPalette()
            :   `rgba(250, ${randomInt(200, 250)}, 0, ${randomFloat(0, 1)})`
        ctx.fill()
        ctx.closePath()
    
        if (angle > 360 * laps) {
            clearInterval(spiralInterval)
        }
    }, 10)

    ctx.save()

}

//  TRIGGER
drawBackground(50, 100, 4)

const footer = document.querySelector('footer')
footer.addEventListener('click', () => {
    drawSpiral(randomInt(2, 5), randomInt(13, 40), randomInt(5, 10))
}, false)

//  RESET
const resetBtn = document.querySelector('#reset')
resetBtn.addEventListener('click', () => {
    clearCanvas()
    drawBackground(50, 100, randomInt(3, 8))
}, false)
