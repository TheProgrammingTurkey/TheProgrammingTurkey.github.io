const output = document.getElementById('showData');
const outputDays = output.getElementsByClassName('day');
const slidersData = document.getElementById('slidersData');
const graphsData = document.getElementById('graphsData');

let points = [];
let myChart;

let posToPoints = new Map([
    ["1", 25],
    ["2", 18],
    ["3", 15],
    ["4", 12],
    ["5", 10],
    ["6", 8],
    ["7", 6],
    ["8", 4],
    ["9", 2],
    ["10", 1]
])

fetch('times.csv')
  .then(response => response.text())
  .then(data => {
    const days = data.trim().split('\n').map(day => day.trim().split(','));
    // Every line is a day with box PAX and raw
    for(let i = 0; i < outputDays.length; i+=2){
        //Raw
        //Info about the event
        outputDays[i].getElementsByClassName('dateLocation')[0].innerHTML = days[i/2+1][0] + " @ " + days[i/2+1][1];
        //Right bound is -1 (.max), left bound is the negative number of entries (.min), value is my position
        outputDays[i].getElementsByClassName('slider')[0].max = -1;
        outputDays[i].getElementsByClassName('slider')[0].min = -days[i/2+1][13];
        outputDays[i].getElementsByClassName('slider')[0].value = -days[i/2+1][6];
        //Position ends in "st", "nd", "rd", or "th" depending on the last digit
        if(days[i/2+1][6]%10 == 1){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][6] + "st out of " + days[i/2+1][13];
        }
        else if(days[i/2+1][6]%10 == 2){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][6] + "nd out of " + days[i/2+1][13];
        }
        else if(days[i/2+1][6]%10 == 3){
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][6] + "rd out of " + days[i/2+1][13];
        }
        else{
            outputDays[i].getElementsByClassName('place')[0].innerHTML = days[i/2+1][6] + "th out of " + days[i/2+1][13];
        }
        //PAX
        //Info about the event
        outputDays[i+1].getElementsByClassName('dateLocation')[0].innerHTML = days[i/2+1][2]
        //Right bound is -1 (.max), left bound is the negative number of entries (.min), value is my position
        outputDays[i+1].getElementsByClassName('slider')[0].max = -1;
        outputDays[i+1].getElementsByClassName('slider')[0].min = -days[i/2+1][13];
        outputDays[i+1].getElementsByClassName('slider')[0].value = -days[i/2+1][8];
        //Position ends in "st", "nd", "rd", or "th" depending on the last digit
        if(days[i/2+1][11]%10 == 1){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][11] + "st out of " + days[i/2+1][13];
        }
        else if(days[i/2+1][11]%10 == 2){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][11] + "nd out of " + days[i/2+1][13];
        }
        else if(days[i/2+1][11]%10 == 3){
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][11] + "rd out of " + days[i/2+1][13];
        }
        else{
            outputDays[i+1].getElementsByClassName('place')[0].innerHTML = days[i/2+1][11] + "th out of " + days[i/2+1][13];
        }
        //PAX time as a percentage of the fastest time, rounded to the nearest whole number
        outputDays[i].getElementsByClassName('time')[0].innerHTML = "|&nbsp;&nbsp;&nbsp;PAX time was " + Math.round((days[i/2+1][3]/days[i/2+1][5])*100) + "% of fastest time";
        //Raw time as a percentage of the fastest time, rounded to the nearest whole number
        outputDays[i+1].getElementsByClassName('time')[0].innerHTML = "|&nbsp;&nbsp;&nbsp;Raw time was " + Math.round((days[i/2+1][8]/days[i/2+1][10])*100) + "% of fastest time";
    }
    // Calculate points based on position using F1 scoring system
    for(let i = 1; i < days.length; i++){
        //If its the first one --> just take the points
        if(i == 1){
            points.push([posToPoints.get(days[i][14]), posToPoints.get(days[i][15])]);
        }// Take the points and all previous points
        else{
            points.push([posToPoints.get(days[i][14])+points[i-2][0], posToPoints.get(days[i][15])+points[i-2][1]]);
        }
    }



    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: ['', ...days.map(sub => sub[0]).slice(1)],
        datasets: [
            {
            label: 'Me',
            data: [0, ...points.map(sub => sub[0])],
            borderWidth: 1
            },
            {
            label: 'My Dad',
            data: [0, ...points.map(sub => sub[1])],
            borderWidth: 1
            }
        ]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                    color: "#D4E0F0"
                }
            },
            title: {
                display: true,
                text: 'Points based off F1 scoring system',
                font: {
                        size: 14,
                    },
                color: "#D4E0F0"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Points',
                    font: {
                        size: 14,
                    },
                    color: "#D4E0F0"
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 14,
                    },
                    color: "#D4E0F0"
                },
                grid: {
                    color: '#333333',
                    lineWidth: 1,
                }
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Event',
                    font: {
                        size: 14,
                    },
                    color: "#D4E0F0"
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: "#D4E0F0"
                },
                grid: {
                    color: '#333333',
                    lineWidth: 1
                }
            }
        }
        }
    });

});

function showData(id){
    if(id == 'slidersData'){
        slidersData.style.display = 'block';
        graphsData.style.display = 'none';
    }
    if(id == 'graphsData'){
        graphsData.style.display = 'block';
        slidersData.style.display = 'none';
        myChart.resize();
    }
}


