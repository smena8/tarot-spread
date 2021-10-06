
const getJSON = async () => {
    const response = await fetch('https://rws-cards-api.herokuapp.com/api/v1/cards');
    const data = await response.json();
    return data;

};

class TarotCard {

    constructor(positionIndex, name, meaning_up, meaning_rev, desc, dataindex) {
        this.positionIndex = positionIndex;
        this.name = name;
        this.meaning_up = meaning_up;
        this.meaning_rev = meaning_rev;
        this.desc = desc;
        this.dataIndex = dataindex;
    }
}

let cardContainer = document.querySelector('.cards-container');
let tarotCards = []
let buttonValue = 0;


document.addEventListener('DOMContentLoaded', () => {

    // setup first card
    if (buttonValue === 0) {
        // get json data and add to array
                buttonValue = 1;
                getJSON()
                    .then(data => data.cards)
                    .then(data => {
                        // make sure to clear previous array
                        tarotCards = []
                        // add cards to array based on button value
                        for (i=0; i < buttonValue; i++) {
                            let dataIndex = (Math.floor(Math.random() * 22));
                            // if card already in array then get a new index number
                            let bool = tarotCards.some(tarotCard => (tarotCard.dataIndex === dataIndex));
                            while (bool == true) {
                                dataIndex = Math.floor(Math.random() * 22);
                                bool = tarotCards.some(tarotCard => (tarotCard.dataIndex === dataIndex));
                            }
                            let cardData = data[dataIndex];
                            // add new object to array
                            newCardObject = new TarotCard(i, cardData.name, cardData.meaning_up, cardData.meaning_rev, cardData.desc, dataIndex);
                            tarotCards.push(newCardObject);
                        }

                        cardContainer.innerHTML = '';
                        tarotCards.forEach(tarotCard => {
                            let name = tarotCard.name;
                            let fileName = name.toLowerCase();
                            if (fileName.includes('the')) {
                                fileName = fileName.split('the ')[1];
                            }
                            if (fileName.includes('judgment')) {
                                fileName = 'last judgement';
                            }
                            const newDiv = document.createElement('div');
                            newDiv.className = 'tarot-card-container';
                            transformOptions = [tarotCard.meaning_up, tarotCard.meaning_rev]
                            // 0 is up, 1 is reversed
                            reverseRandomIndex = Math.floor(Math.random() * 2)
                            let title = tarotCard.name
                            let meaning = transformOptions[reverseRandomIndex]
                            if (reverseRandomIndex === 1) {
                                title = title.concat(' ', '(Reversed)')
                            }
                            newDiv.innerHTML = `<div class="tarot-card">
                                                    <img class="front-face" src="/static/tarot/cards_png/${fileName}_line.png" alt="${name}">
                                                    <img class="back-face" src="/static/tarot/cards_png/cover_line.png" alt="blank card">
                                                 </div>
                                                 <div class="card-info">
                                                    <h1>${title}</h1>
                                                    <p>${meaning}</p>
                                                 </div>
                                                </div>

                                          `
                            if (reverseRandomIndex === 1) {
                                newDiv.childNodes[0].childNodes[1].style = 'transform: rotateX(180deg)';
                            }
                            cardContainer.appendChild(newDiv);
                        });

                    // add event listeners to flip cards
                    cards = document.querySelectorAll('.tarot-card');

                    cards.forEach(card => {
                        card.addEventListener('click', flipCard);
                    });
                });
    }

    const buttons = document.querySelectorAll('button');

    // click to flip cards over
    let cards = document.querySelectorAll('.tarot-card');

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

    buttons.forEach(button => {
        button.addEventListener('click', function(){
                let buttonValue = this.value;
                // get json data and add to array
                getJSON()
                    .then(data => data.cards)
                    .then(data => {
                        // make sure to clear previous array
                        tarotCards = []
                        // add cards to array based on button value
                        for (i=0; i < buttonValue; i++) {
                            let dataIndex = (Math.floor(Math.random() * 22));
                            // if card already in array then get a new index number
                            let bool = tarotCards.some(tarotCard => (tarotCard.dataIndex === dataIndex));
                            while (bool == true) {
                                dataIndex = Math.floor(Math.random() * 22);
                                bool = tarotCards.some(tarotCard => (tarotCard.dataIndex === dataIndex));
                            }
                            let cardData = data[dataIndex];
                            // add new object to array
                            newCardObject = new TarotCard(i, cardData.name, cardData.meaning_up, cardData.meaning_rev, cardData.desc, dataIndex);
                            tarotCards.push(newCardObject);
                        }

                        cardContainer.innerHTML = '';
                        tarotCards.forEach(tarotCard => {
                            let name = tarotCard.name;
                            let fileName = name.toLowerCase();
                            if (fileName.includes('the')) {
                                fileName = fileName.split('the ')[1];
                            }
                            if (fileName.includes('judgment')) {
                                fileName = 'last judgement';
                            }
                            const newDiv = document.createElement('div');
                            newDiv.className = 'tarot-card-container';
                            transformOptions = [tarotCard.meaning_up, tarotCard.meaning_rev]
                            // 0 is up, 1 is reversed
                            reverseRandomIndex = Math.floor(Math.random() * 2)
                            let title = tarotCard.name
                            let meaning = transformOptions[reverseRandomIndex]
                            if (reverseRandomIndex === 1) {
                                title = title.concat(' ', '(Reversed)')
                            }
                            newDiv.innerHTML = `<div class="tarot-card">
                                                    <img class="front-face" src="/static/tarot/cards_png/${fileName}_line.png" alt="${name}">
                                                    <img class="back-face" src="/static/tarot/cards_png/cover_line.png" alt="blank card">
                                                 </div>
                                                 <div class="card-info">
                                                    <h1>${title}</h1>
                                                    <p>${meaning}</p>
                                                 </div>
                                                </div>

                                          `
                            if (reverseRandomIndex === 1) {
                                newDiv.childNodes[0].childNodes[1].style = 'transform: rotateX(180deg)';
                            }
                            cardContainer.appendChild(newDiv);
                        });

                    // add event listeners to flip cards
                    cards = document.querySelectorAll('.tarot-card');

                    cards.forEach(card => {
                        card.addEventListener('click', flipCard);
                    });
                });
        });
    });



});


function flipCard() {
    this.classList.toggle('flip');
    this.nextElementSibling.classList.toggle('flip');
    this.removeEventListener('click', flipCard);
}
