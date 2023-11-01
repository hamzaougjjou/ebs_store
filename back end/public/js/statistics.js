
// const labels = Utils.months({ count: 7 });
var month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const data = {
    labels: month,
    datasets: [{
        label: false,
        data: [65, 59, 80, 81, 56, 55, 40, 90, 90, 909, 834, 1200],
        fill: false,
        borderColor: '#685CE4',
        tension: 0
    },
    {
        label: false,
        data: [89, 784, 345, 2453, 495, 345, 345, 434, 984, 3455, 2453, 2600],
        fill: false,
        borderColor: '#5FCBFB',
        tension: 0
    }

    ],
};

const config = {
    type: 'line',
    data: data,

    options: {
        legend: {
            display: false
        }
    }

};
// Get the canvas element and create the chart
var ctx = document.getElementById('myLineChart').getContext('2d');

var myLineChart = new Chart(ctx, config);