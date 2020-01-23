import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            following: ""
        }
    }
    componentDidMount() {
        fetch('http://localhost:3001/follow', { method: 'get' })
            .then(response => response.json())
            .then(data => {
                if (data[0].location) {
                    const location = data.map(element => element.location);
                    const following = data.map(element => element.Following);
                    this.setState({ location, following })
                    console.log(location, following);
                } else {
                    console.log('no follows');
                }
            });
    }
    render() {
        var chartData = {
            labels: this.state.location,
            datasets: [{
                label: 'Follows',
                data: this.state.following,
                backgroundColor: 'purple',
                borderWidth: 1,
                borderColor: 'black',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }]
        }
        var options = {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    fontColor: 'black'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        fontColor: "black",
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 20
                    }
                }]
            },
            layout: {
                padding: 10
            },
        }
        return (
            <div>
                <h2 className='textCenter'>Number of Follows</h2>
                <Bar
                    data={chartData}
                    options={options}
                />
            </div>
        )
    }
}
export default Graph;