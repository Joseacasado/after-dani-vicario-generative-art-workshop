const randomFloat = (min, max) => Math.random() * (max - min) + min
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const shuffle = (array) => array.sort(() => Math.random() - 0.5)

//  COLORS
const randomRed = () => `rgba(${randomInt(0, 225)}, 0, 0, ${randomFloat(0, 1)})`
const randomGreen = () => `rgba(0, ${randomInt(0, 225)}, 0, ${randomFloat(0, 1)})`
const randomBlue = () => `rgba(0, 0, ${randomInt(0, 225)}, ${randomFloat(0, 1)})`
const randomAll = () => `rgba(${randomInt(0, 225)}, ${randomInt(0, 225)}, ${randomInt(0, 225)}, ${randomFloat(0, 1)})`

const paletteArr = [
    randomRed,
    randomGreen,
    randomBlue,
    randomAll
]