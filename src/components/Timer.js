import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { startTimer, updateTimer, stopTimer, resetTimer } from '../actions/actions';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.startTimerFunc = this.startTimerFunc.bind(this);
        this.stopTimerFunc = this.stopTimerFunc.bind(this);
        this.onBlurWindow = this.onBlurWindow.bind(this);
        this.onFocusWindow = this.onFocusWindow.bind(this);
    }
    componentDidMount() {
        window.addEventListener("blur", this.onBlurWindow);
        window.addEventListener("focus", this.onFocusWindow);
        this.startTimerFunc();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.isGameLost || nextProps.isGameWon) {
            this.stopTimerFunc();
        }
    }

    onBlurWindow() {
        // console.log("blur");
        // console.log(new Date());
        this.stopTimerFunc();
    }

    onFocusWindow() {
        // console.log("focus");
        // console.log(new Date());
        this.startTimerFunc();
    }

    startTimerFunc() {
        this.props.startTimer();
        this.timer = setInterval(() => {
            this.props.updateTimer();
        }, 10);
    }

    stopTimerFunc() {
        clearInterval(this.timer);
        this.props.stopTimer();
    }

    render() {
        let centiseconds = ("0" + (Math.floor(this.props.timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(this.props.timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.props.timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.props.timerTime / 3600000)).slice(-2);
        return (
            <React.Fragment>
                <div className="timerDiv fw-bold">
                    Time Elapsed : {hours} : {minutes} : {seconds} : {centiseconds}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isGameLost: state.game.isGameLost,
    isGameWon: state.game.isGameWon,
    timerOn: state.game.timerOn,
    timerStart: state.game.timerStart,
    timerTime: state.game.timerTime,
});

export default connect(mapStateToProps, {
    startTimer, updateTimer, stopTimer, resetTimer
})(Timer);




