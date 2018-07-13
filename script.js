class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;

        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0  
            },
            results: []
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 
            }
        });
    }

    resetTimer() {
        this.reset();
        if (this.running) {
            this.running = false;
            clearInterval(this.watch);
        }    
    }

    format(times) {
        return `${pad0(times.minutes)} : ${pad0(times.seconds)} : ${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        const times = Object.assign({}, this.state.times);

        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }

        this.setState({ times });
    }
    
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    add() {
        const results = this.state.results.slice();

        results.push(this.format(this.state.times));
        this.setState({ results });
    }

    clear() {
        this.setState({ results: [] });
    }

    render() {
        return (
            <div>
                <nav class="controls">
                    <a href="#" class="button" onClick={this.start.bind(this)}>Start</a>
                    <a href="#" class="button" onClick={this.stop.bind(this)}>Stop</a>
                    <a href="#" class="button" onClick={this.add.bind(this)}>Add</a>
                    <a href="#" class="button" onClick={this.clear.bind(this)}>Clear</a>
                </nav>
                <div class="stopwatch">
                    { this.format(this.state.times) }
                </div>
                <nav class="controls">
                    <a href="#" class="button" onClick={this.resetTimer.bind(this)}>Reset</a>
                </nav>
                <ul class="results">
                    {this.state.results.map(result => <li>{result}</li>)}
                </ul>
            </div>
        )
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('root')
);
