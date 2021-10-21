const axios = require("axios")
const Chart = require("chart.js")

async function createChart() {
    const labels = []
    const values = []
    const URL = "https://api.coinbase.com/v2/prices/BTC-EUR/spot"
    const days = 30

    for (var i = 0; i < days; i++) {
        var d = new Date();
        d.setDate(d.getDate() - (days - i))
        var currdate = d.toISOString().replace(/T.*/, "")
        var res = await axios.get(URL + "?date=" + currdate)
        values.push(res.data.data.amount)
        labels.push(currdate)
        console.log(currdate, res.data.data.amount)
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'BTC-EUR',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    return new Chart(
        document.getElementById('myChart'),
        config
    );
}

var chart

window.addEventListener('DOMContentLoaded', () => {
    createChart().then((ch) => { chart = ch })
})
