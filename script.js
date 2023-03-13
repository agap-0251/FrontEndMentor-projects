let xValues = [];
let yValues = [];
let orangeColor = "hsl(16, 97%, 65%)";
let diffColor = "hsl(186, 34%, 60%)";
let barColors = ["hsl(16, 97%, 65%)"];

let presentDay = new Date().toUTCString().substring(0,3).toLocaleLowerCase();
let currentIndex;

function fillData(data) {
    xValues = data.map(ob => ob.day)
    yValues = data.map(ob => ob.amount)
    let arr = data.map(ob => ob.day)
    for(let i = 0; i<arr.length;i++){
      if(arr[i] === presentDay){
        currentIndex = i;
        barColors[i] = diffColor;
      }
      else
      barColors[i] = orangeColor
    }
}

function getPosition(wid) {
  if(wid< 420){
    return 'top';
  }
  else if(wid < 980){    
    return 'start';
  }
  else 
    return 'start'
}

function getSize(wid) {
  if(wid< 420)
    return 25;
  else if(wid < 980){    
    return 20;
  }
  else 
    return 30
}

function getPadd(wid) {
  if(wid< 420)
    return 0;
  else if(wid < 980)
    return 1;
  else
    return 5;
}

function getBarWidth(wid) {
  if(wid < 420)
    return 30;
  else if(wid< 980)
    return 40;
  else
    return 50;
}

fetch("/data.json")
.then(res => res.json())
.then(data => fillData(data))
.then(drawChart)

function drawChart() {
    new Chart("myChart", {
      
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues,
            borderRadius: 5,
            barThickness: getBarWidth(window.innerWidth),
            barPercentage: 1,
            categoryPercentage: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },

            title: {
              text: "Spending - Last 7 days",
              display: true,
              align: getPosition(window.innerWidth),
              color: 'black',
              padding: getPadd(window.innerWidth),
              font: {
                size: getSize(window.innerWidth)
              }
            }
          },

          scales: {
            x: {
               grid: {
                  display: false
               },
            },
            y: {
              display: false,
               grid: {
                  display: false
               }
            },
            
        }
        }
      });
}
