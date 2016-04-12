import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { ButtonGroup, Button, Glyphicon, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      loggedIn: false,
    }
  }



  render() {
    var signInText;
    var signInButton;
    if(Meteor.user()){
      signInButton = (<Button href="/logout"><Glyphicon glyph="log-out"/></Button>);
      signInText = (<NavItem className='hidden-xs hidden-sm' eventKey={3} href="/logout">Log Out</NavItem>);
    } else {
      signInButton = (<Button href="/signin"><Glyphicon glyph="user"/></Button>);
      signInText = (<NavItem className='hidden-xs hidden-sm' eventKey={3} href="/signin">Sign In</NavItem>);
    }
    return (
      <Navbar fixedBottom fluid>
          <Nav>
            <NavItem className='hidden-xs hidden-sm' eventKey={1} href="/">NewsFeed</NavItem>
            <NavItem className='hidden-xs hidden-sm' eventKey={2} href="/camera">Camera</NavItem>
            <NavItem className='hidden-xs hidden-sm' eventKey={3} href="/map">Map</NavItem>
            {signInText}

            /* Navbar doesn't support justified nav items even though it 'does'  *
             * Hack to allow us to use the entire bottom row for buttons for now */
            <NavItem className='hidden-md hidden-lg'>
              <ButtonGroup justified>
                <Button href="/"><Glyphicon glyph="list-alt"/></Button>
                <Button href="/camera"><Glyphicon glyph="camera"/></Button>
                <Button href="/map"><Glyphicon glyph="map-marker"/></Button>
                {signInButton}
              </ButtonGroup>
            </NavItem>
        </Nav>
      </Navbar>
    );
  }   
}

            // <NavItem className='hidden-md hidden-lg' eventKey={1} href="/"><Glyphicon glyph="list-alt"/></NavItem>
            // <NavItem className='hidden-md hidden-lg' eventKey={2} href="/camera"><Glyphicon glyph="camera"/></NavItem>
            // <NavItem className='hidden-md hidden-lg' eventKey={3} href="/map"><Glyphicon glyph="map-marker"/></NavItem>
            // <NavItem className='hidden-md hidden-lg' eventKey={3} href="/signin"><Glyphicon glyph="user"/></NavItem>          


// <nav className='navbar navbar-light'>
//         <div className='container-fluid'>
//           <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
//             <ul className='nav navbar-nav'>
//               <li>
//                 <a href='/camera'>Camera</a></li>
//               <li>
//                 <a href='/'>NewsFeed</a>
//               </li>
//               <li>
//                 <a href='/map'>Map</a>
//               </li>
//               <li>
//                 <a href='/photo/:_id'>PhotoViewer </a>
//               </li>
//               {signInButton}
//             </ul>
//           </div>
//         </div>
//       </nav>