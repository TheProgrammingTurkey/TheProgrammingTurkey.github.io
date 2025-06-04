const output = document.getElementById('showData');
const outputDays = output.getElementsByClassName('day');

fetch('times.csv')
  .then(response => response.text())
  .then(data => {
    const days = data.trim().split('\n').map(day => day.trim().split(','));
    for(let i = 0; i < outputDays.length; i++){
        outputDays[i].getElementsByClassName('dateLocation')[0].innerHTML = days[i+1][0] + " @ " + days[i+1][1];
        if(days[i+1][0]%10 == 1){
            outputDays[i].getElementsByClassName('results')[0].innerHTML = days[i+1][4] + "st out of " + days[i+1][5] + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i+1][2]/days[i+1][3])*100) + "% of fastest time";
        }
        if(days[i+1][0]%10 == 1){
            outputDays[i].getElementsByClassName('results')[0].innerHTML = days[i+1][4] + "nd out of " + days[i+1][5] + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i+1][2]/days[i+1][3])*100) + "% of fastest time";
        }
        if(days[i+1][0]%10 == 1){
            outputDays[i].getElementsByClassName('results')[0].innerHTML = days[i+1][4] + "rd out of " + days[i+1][5] + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i+1][2]/days[i+1][3])*100) + "% of fastest time";
        }
        else{
            outputDays[i].getElementsByClassName('results')[0].innerHTML = days[i+1][4] + "th out of " + days[i+1][5] + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i+1][2]/days[i+1][3])*100) + "% of fastest time";
        }

    }
  });