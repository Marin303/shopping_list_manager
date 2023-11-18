import React from 'react'
import { NavLink } from 'react-router-dom'
import "./dropdown.scss"

const ShoppingNavDropdown = () => {
  return (
    <nav className="shopping_navbar_dropdown">
      <ul>
        <li>
          <NavLink to="/shopping-list/groceries" activeclassname="active">
            Groceries
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/household-items" activeclassname="active">
            Household
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/technique" activeclassname="active">
            Technique
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/apparel" activeclassname="active">
            Apparel
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/footwear" activeclassname="active">
            Footwear
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/other" activeclassname="active">
            Other
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ShoppingNavDropdown