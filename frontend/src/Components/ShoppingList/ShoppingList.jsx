import React from 'react'
import "./shopping.scss"
import { Link } from 'react-router-dom'

const ShoppingList = () => {
  return (
    <div className='shopping_list_container'>
      {/* <h3>Example how a Shopping List could looks like</h3> */}
      <nav>
        <ul>
          <Link to="/gloceries">Groceries</Link>
          <Link to="/hosehold-items">Household items</Link>
          <Link to="/technique">Technique</Link>
          <Link to="/apparel">Apparel</Link>
          <Link to="/footwear">Footwear</Link>
          <Link to="/other">Other</Link>
        </ul>
      </nav>
    {/*   <form action="">

      </form> */}
    </div>
  )
}

export default ShoppingList