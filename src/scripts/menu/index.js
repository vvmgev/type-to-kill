
const overlayElem = document.querySelector('.overlay');
const overlayContetElem = document.querySelector('.overlay-content');
const menuTemplate = document.querySelector('#menu-template');
const waveTemplate = document.querySelector('#wave-template');

overlayContetElem.innerHTML = menuTemplate.innerHTML;
const startGameElem = document.querySelector('.start-game');

export function startNewGamaPromise(waveNumber) {
    return new Promise((resolve, reject) => {
        startGameElem.addEventListener('click', () => {
            overlayElem.classList.add('hideTranstion');
            const menuElem = document.querySelector('.menu');
            menuElem.classList.add('hideTranstion');
        }, {once: true});

        overlayElem.addEventListener('transitionend', () => {
            showWave(resolve, waveNumber);
        });
    })
}

export function newLevelPromise(waveNumber) {
    return new Promise((resovle, reject) => {
        showWave(resovle, waveNumber)
    })
}


const showWave = (resolve, waveNumber) => {
    overlayContetElem.innerHTML = waveTemplate.innerHTML;
    const waveElem = document.querySelector('.wave'); 
    waveElem.querySelector('.wave-number').innerHTML = waveNumber;
    animate(document.querySelector('.wave'), {addClass: 'showTransition',}, () => {
        animate(waveElem, {removeClass: 'hideTranstion'}, () => {
            resolve();
        })
    })
}


const animate = (element, options, cb) => {
    setTimeout(() => {
        const transitionend = (cb) => {
            element.addEventListener('transitionend', e => {
                cb();
            }, {once: true})
        }


        if(options.addClass) {
            element.classList.add(options.addClass);
            transitionend(cb);
            return;
        }

        if(options.removeClass) {
            element.classList.add('hideTranstion');
            transitionend(cb);
        }
    })
}
