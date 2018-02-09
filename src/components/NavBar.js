import React from 'react';
import InlineSVG from 'svg-inline-react';
import bracket from '!raw-loader!../assets/images/svg/logo-cmoa-bracket.svg';
import wordmark2 from '!raw-loader!../assets/images/svg/logo-cmoa-wordmark-2-line.svg';
import wordmark1 from '!raw-loader!../assets/images/svg/logo-cmoa-wordmark-1-line.svg';

const NavBar = () => (
  <nav className="main-nav">
    <div className="nav__container l-container">
      <div className="nav__logo-col l-short">
        <a href="/" className="nav__logo-link">
          <InlineSVG src={bracket} element="span" />
          <InlineSVG src={wordmark2} element="span" />
          <InlineSVG src={wordmark1} element="span" />
        </a>
      </div>
    </div>
  </nav>
);

export default NavBar;
