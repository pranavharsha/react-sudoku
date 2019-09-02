import React, { Component } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActivePuzzleBlock } from '../actions/actions';
import '../styles/Game.css';

class GridRow extends Component {
    constructor(props) {
        super(props);
        this.inputSelect = this.inputSelect.bind(this);
    }

    componentDidMount() {

    }

    inputSelect(event, row, col) {
        this.props.setActivePuzzleBlock({ "row": row, "col": col });
    }

    render() {

        let gridRow = this.props.rowData.map((item, ix) => {

            if (item === 0) {
                return (
                    <div className={"gridInputOuter " + (this.props.acUpR === this.props.rowIx && this.props.acUpC === ix ? 'gridInputOuterActive ' : '')
                        + (this.props.isGameLost || this.props.isGameWon ? 'gridInputOuterDis ' : '')}
                        key={'col' + ix}
                        onClick={(event) => !this.props.isGameLost && !this.props.isGameWon ? this.inputSelect(event, this.props.rowIx, ix) : undefined}
                    >
                        <div className="gridIpDiv">{" "}</div>
                    </div>
                )
            } else {
                if (this.props.puzzle[this.props.rowIx][ix] === parseInt(item)) {
                    return (
                        <div className="gridInputOuter gridInputOuterDis" key={'col' + ix}>
                            <div className="gridIpDiv">{item}</div>
                        </div>
                    )
                } else {
                    if (this.props.solvedPuzzle[this.props.rowIx][ix] === parseInt(item)) {
                        return (
                            <div className={"gridInputOuter " + (this.props.acUpR === this.props.rowIx && this.props.acUpC === ix ? 'gridInputOuterActive ' : '')
                                + (this.props.isGameLost || this.props.isGameWon ? 'gridInputOuterDis ' : '')}
                                key={'col' + ix}
                                onClick={(event) => !this.props.isGameLost && !this.props.isGameWon ? this.inputSelect(event, this.props.rowIx, ix) : undefined}
                            >
                                <div className="gridIpDiv">{item}</div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={"gridInputOuter gridInputMistake " + (this.props.acUpR === this.props.rowIx && this.props.acUpC === ix ? 'gridInputOuterActive ' : '')
                                + (this.props.isGameLost || this.props.isGameWon ? 'gridInputOuterDis ' : '')}
                                key={'col' + ix}
                                onClick={(event) => !this.props.isGameLost && !this.props.isGameWon ? this.inputSelect(event, this.props.rowIx, ix) : undefined}
                            >
                                <div className="gridIpDiv">{item}</div>
                            </div>
                        )
                    }
                }
            }
        });

        return (
            <React.Fragment>
                {gridRow}
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
});

export default connect(mapStateToProps, { setActivePuzzleBlock })(GridRow);

