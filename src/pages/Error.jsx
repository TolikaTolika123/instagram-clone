import React, {useState} from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Error = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  return (
    <div className='error' onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
      <h2 className="error-title">Sorry, this page isn't available.</h2>
      <p className="error-subtitle">
        <span>The link you followed may be broken, or the page may have been removed. </span>
        <Link to='/'>Go back to Instagram.</Link>
      </p>
      </div>     
    </div>
  )
}

export default Error