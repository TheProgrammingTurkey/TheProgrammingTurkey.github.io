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