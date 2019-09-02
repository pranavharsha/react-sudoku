import React, { Component } from 'react'
import { Container, Row, Col, Button, Modal, Label, ModalBody, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMistakes } from '../actions/actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.misIpChange = this.misIpChange.bind(this);
    }

    componentDidMount() {

    }

    misIpChange(event) {
        this.props.setMistakes(event.target.value);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Col className="text-center mt-4 custHeading text-uppercase">
                        Sudoku
                    </Col>
                    <Col className="mt-4 pl-2 pr-2">
                        Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.
                    </Col>
                    <Col className="mt-4">
                        Instructions:<br></br>
                        <ul>
                            <li>Select the box from puzzle which needs to be filled / replaced.</li>
                            <li>Select the number from the list of numbers given on right.</li>
                            <li>If the selected number is wrong, then it is highlighted in red and will be counted as a wrong input.</li>
                            <li>A timer will start automatically once you start solving the puzzle.</li>
                            <li>The timer will be paused if you go to other tab / minimize the window.</li>
                        </ul>
                    </Col>
                    <Col className="mt-5 pl-2 pr-2 text-center">
                        {/* <Link to="/playgame"> */}
                        <Button className="btn customBtn fw-600 fs-16px text-uppercase" onClick={this.toggle}>play</Button>
                        {/* </Link> */}
                    </Col>
                </Container>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <Col>
                            <Label for="chancesSelect">Select number of chances(wrong inputs) required to solve the puzzle</Label>
                            <Input type="select" name="select" id="chancesSelect" onChange={(event) => this.misIpChange(event)}
                                defaultValue={this.props.mistakesTolerated}>
                                <option>3</option>
                                <option>5</option>
                                <option>7</option>
                                <option>10</option>
                            </Input>
                        </Col>
                        <Col className="text-center mt-3">
                            <Link to="/playgame">
                                <Button className="btn customBtn fw-600 fs-16px text-uppercase mr-3">Start</Button>
                            </Link>
                            <Button className="btn customBtn fw-600 fs-16px text-uppercase" onClick={this.toggle}>Cancel</Button>
                        </Col>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    mistakesTolerated: state.game.mistakesTolerated,
    mistakesCount: state.game.mistakesCount,
});

export default connect(mapStateToProps, { setMistakes })(Home);

