//history section
function historyPage(){
    let navbar = document.getElementById('topnav');
    let timeline = document.getElementById('timeline');
    let centerLine = document.getElementsByClassName('centerLine')[0];
    let tops = document.getElementsByClassName('top');
    let bottoms = document.getElementsByClassName('bottom');
    let key = document.getElementById('key');

    timeline.style.height = window.innerHeight-navbar.offsetHeight + 'px';

    Array.from(tops).forEach(entry => {
        let line = entry.getElementsByClassName('line')[0];
        let text = entry.getElementsByClassName('text')[0];
        line.style.top = 0;
        line.style.minHeight = (centerLine.getBoundingClientRect().y-text.getBoundingClientRect().y-text.getBoundingClientRect().height/2) + 'px';
    });

    Array.from(bottoms).forEach(entry => {
        let line = entry.getElementsByClassName('line')[0];
        let text = entry.getElementsByClassName('text')[0];
        line.style.bottom = 0;
        line.style.minHeight = (text.getBoundingClientRect().y-centerLine.getBoundingClientRect().y+text.getBoundingClientRect().height/2) + 'px';
    });
    key.style.top = (navbar.offsetHeight + 20) + 'px';

    timeline.addEventListener('wheel', (event) => {
        event.preventDefault();
        timeline.scrollLeft += event.deltaY*2;
    });
}

//expertise section
let icons = ['assets/js.png', 'assets/html.png', 'assets/css.png', 'assets/java.png', 'assets/python.png', 'assets/sheets.png', 'assets/freecad.png'];
let iconExplanations = ['htmlExp', 'cssExp', 'javaExp', 'pythonExp', 'sheetsExp', 'freecadExp', 'jsExp'];
function homePage() {
    document.getElementById('leftIMG').src = icons[0];
    document.getElementById('centerIMG').src = icons[1];
    document.getElementById('rightIMG').src = icons[2];
    document.getElementById('actualExp').innerHTML = document.getElementById(iconExplanations[0]).innerHTML;
}

function expertiseScrollLeft() {
    let finalIcon = icons[icons.length-1];
    let finalExplanation = iconExplanations[iconExplanations.length-1];
    for(let i = icons.length-1; i > 0; i--){
        icons[i] = icons[i-1];
        iconExplanations[i] = iconExplanations[i-1];
    }
    icons[0] = finalIcon;
    iconExplanations[0] = finalExplanation;
    homePage();
}

function expertiseScrollRight() {
    let firstIcon = icons[0];
    let firstExplanation = iconExplanations[0];
    for(let i = 0; i < icons.length-1; i++){
        icons[i] = icons[i+1];
        iconExplanations[i] = iconExplanations[i+1];
    }
    icons[icons.length-1] = firstIcon;
    iconExplanations[iconExplanations.length-1] = firstExplanation;
    homePage();
}
