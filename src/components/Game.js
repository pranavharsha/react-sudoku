import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetCurrentPuzzle, setCurrentPuzzleValue, resetTimer } from '../actions/actions';
import '../styles/Game.css';
import GridRow from './GridRow';
import Timer from './Timer';

class Game extends Component {
    constructor(props) {
        super(props);
        this.gridIpClick = this.gridIpClick.bind(this);
    }

    componentDidMount() {
        this.props.resetCurrentPuzzle();
    }

    gridIpClick(value) {
        if (this.props.acUpR != -1 && this.props.acUpC != -1) {
            this.props.setCurrentPuzzleValue({ "value": value, "row": this.props.acUpR, "col": this.props.acUpC });
        }
    }

    render() {

        let grid = this.props.currentPuzzle.map((item, ix) => {
            return (
                <div className="d-flex gridOuterRow" key={'row' + ix}>
                    <GridRow rowData={item} rowIx={ix} />
                </div>
            )
        });

        let centiseconds = ("0" + (Math.floor(this.props.timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(this.props.timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.props.timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.props.timerTime / 3600000)).slice(-2);

        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Row className="ml-0 mr-0 mt-3 mb-5">

                        <Col md="4" className="">
                            Instructions:<br></br>
                            <ul>
                                <li>Select the box from puzzle which needs to be filled / replaced.</li>
                                <li>Select the number from the list of numbers given on right.</li>
                                <li>If the selected number is wrong, then it is highlighted in red and will be counted as a wrong input.</li>
                                <li>A total of {this.props.mistakesTolerated} wrong inputs are taken, after that the puzzle gets locked.</li>
                                <li>A timer will start automatically once you start solving the puzzle.</li>
                                <li>The timer will be paused if you go to other tab / minimize the window.</li>
                            </ul>
                        </Col>

                        <Col md="6" className="">
                            <Row className="ml-0 mr-0 pb-3">
                                <Col className="fw-bold" xs="6">
                                    Chances left : {this.props.mistakesTolerated - this.props.mistakesCount}
                                </Col>
                                <Col className="" md="6"><Timer /></Col>
                            </Row>
                            {
                                this.props.isGameLost ? (
                                    <Col className="mb-3 text-center gameResDiv">
                                        Sorry ! &nbsp; Game Over<br></br>
                                        Time Taken : {hours} : {minutes} : {seconds} : {centiseconds}<br></br>
                                        <Button className="btn customBtn fw-600 fs-16px text-uppercase mt-2"
                                            onClick={() => { window.location.href = "/" }}
                                        >Start Again</Button>
                                    </Col>
                                ) : undefined
                            }
                            {
                                this.props.isGameWon ? (
                                    <Col className="mb-3 text-center gameResDiv">
                                        Congrats! &nbsp; You have solved the puzzle<br></br>
                                        Time Taken : {hours} : {minutes} : {seconds} : {centiseconds}<br></br>
                                        <Button className="btn customBtn fw-600 fs-16px text-uppercase mt-2"
                                            onClick={() => { window.location.href = "/" }}
                                        >Start Again</Button>
                                    </Col>
                                ) : undefined
                            }

                            <div className="d-flex justify-content-center">
                                <div className="mr-4 gridDiv">
                                    {grid}
                                </div>
                                <div className="d-flex flex-column numSelDivOuter">
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(1)}
                                    >1</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(2)}
                                    >2</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(3)}
                                    >3</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(4)}
                                    >4</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(5)}
                                    >5</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(6)}
                                    >6</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(7)}
                                    >7</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(8)}
                                    >8</div>
                                    <div className="gridInputOuterNumSel"
                                        onClick={(event) => this.gridIpClick(9)}
                                    >9</div>
                                </div>
                            </div>
                        </Col>

                        <Col md="2" className="mt-4"></Col>

                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    puzzle: state.game.puzzle,
    solvedPuzzle: state.game.solvedPuzzle,
    currentPuzzle: state.game.currentPuzzle,
    lUpR: state.game.lUpR,
    lUpC: state.game.lUpC,
    acUpR: state.game.acUpR,
    acUpC: state.game.acUpC,
    mistakesTolerated: state.game.mistakesTolerated,
    mistakesCount: state.game.mistakesCount,
    isGameLost: state.game.isGameLost,
    isGameWon: state.game.isGameWon,
    timerOn: state.game.timerOn,
    timerStart: state.game.timerStart,
    timerTime: state.game.timerTime,
});

export default connect(mapStateToProps, {
    resetCurrentPuzzle, setCurrentPuzzleValue, resetTimer
})(Game);

