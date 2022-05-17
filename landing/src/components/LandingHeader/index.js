import LandingLogo from "../LandingLogo";
import './index.css';
import { NavLink } from "react-router-dom";
// TODO: Separate out into new component

const LandingHeader = (props) => {
  return (<div className="LandingPageHeader">
    <LandingLogo />
    <div className="LandingNavBar">
      <NavLink exact to='' activeClassName="Active">Home</NavLink>
      <NavLink exact to='team' activeClassName="Active">Team</NavLink>
      <NavLink exact to='about' activeClassName="Active">About</NavLink>
      {/* {menuItems.map(menuItem => 
            <Link 
             style={this.state.active === menuItem ? activeStyle : {}} 
             onClick={this._handleClick.bind(this, menuItem)}
            > 
              {menuItem}
            </Link>
         )} */}
      {/* <a className='NavLink' href="/">Home</a>
      <a className='NavLink' href="/team">Team</a>
      <a className='NavLink' href="/about">About</a> */}
    </div>
  </div>)
}
export default LandingHeader;