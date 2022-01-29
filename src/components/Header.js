import React from 'react'
import logoPath from '../images/header_logo.png';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="лого Mesto Russia" />
    </header>
  )
}

export default Header