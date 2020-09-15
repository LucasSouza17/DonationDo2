import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

const LandingHeader: React.FC  = (props) => {
  return(
    <header className="landing-header">
        <div className="logo-container">
          <img src={logoImg} alt="DonationDo" />
        </div>

        {props.children}
        
      </header>
  )
}

export default LandingHeader;