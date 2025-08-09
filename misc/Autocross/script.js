const output = document.getElementById('showData');
const outputDays = output.getElementsByClassName('day');

fetch('times.csv')
  .then(response => response.text())
  .then(data => {
    const days = data.trim().split('\n').map(day => day.trim().split(','));
    for(let i = 0; i < outputDays.length; i+=2){
        outputDays[i].getElementsByClassName('dateLocation')[0].innerHTML = days[i/2+1][0] + " @ " + days[i/2+1][1];
        outputDays[i].getElementsByClassName('slider')[0].max = 1;
        outputDays[i].getElementsByClassName('slider')[0].min = -days[i/2+1][9];
        outputDays[i].getElementsByClassName('slider')[0].value = -days[i/2+1][5];
        if(days[i/2+1][5]%10 == 1){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][5] + "st out of " + days[i/2+1][9];
        }
        else if(days[i/2+1][5]%10 == 2){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][5] + "nd out of " + days[i/2+1][9];
        }
        else if(days[i/2+1][5]%10 == 3){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][5] + "rd out of " + days[i/2+1][9];
        }
        else{
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][5] + "th out of " + days[i/2+1][9];
        }
        outputDays[i+1].getElementsByClassName('dateLocation')[0].innerHTML = days[i/2+1][2]
        outputDays[i+1].getElementsByClassName('slider')[0].max = 1;
        outputDays[i+1].getElementsByClassName('slider')[0].min = -days[i/2+1][9];
        outputDays[i+1].getElementsByClassName('slider')[0].value = -days[i/2+1][8];
        if(days[i/2+1][8]%10 == 1){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][8] + "st out of " + days[i/2+1][9];
        }
        else if(days[i/2+1][8]%10 == 2){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][8] + "nd out of " + days[i/2+1][9];
        }
        else if(days[i/2+1][8]%10 == 3){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][8] + "rd out of " + days[i/2+1][9];
        }
        else{
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][8] + "th out of " + days[i/2+1][9];
        }
        outputDays[i].getElementsByClassName('time')[0].innerHTML = "|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i/2+1][3]/days[i/2+1][4])*100) + "% of fastest time";
        outputDays[i+1].getElementsByClassName('time')[0].innerHTML = "|&nbsp;&nbsp;&nbsp;Raw time was " + Math.round((days[i/2+1][6]/days[i/2+1][7])*100) + "% of fastest time";
    }
  });