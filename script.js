let navbar = document.getElementById('topnav');
let timelines = document.getElementById('timelines');
let centerLine = document.getElementsByClassName('centerLine')[0];


timelines.style.height = window.innerHeight-navbar.offsetHeight + 'px';
