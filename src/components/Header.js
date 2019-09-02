import React, { Component } from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Col, Dropdown, Row,Badge 
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className="topnavbar">
                    <Col xs="12" className="pl-0 pr-0">
                        <a href="/" className="nav-title">
                            Sudoku 
                        </a>
                    </Col>
                </Navbar>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {  })(Header);