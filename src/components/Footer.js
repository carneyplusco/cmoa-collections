import React from 'react';
import InlineSVG from 'svg-inline-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faVimeoV } from '@fortawesome/fontawesome-free-brands';
import cmoaLogo from '!raw-loader!../assets/images/svg/logo-cmoa.svg';
import appStoreLogo from '!raw-loader!../assets/images/svg/logo-app-store.svg';

const Footer = () => (
  <footer className="l-container">
    <div className="footer__logo">
      <InlineSVG src={cmoaLogo} element="span" />
    </div>
    <div className="footer__address">
      <p>
        4400 Forbes Avenue
        <br />
        Pittsburgh, PA 15213
        <br />
        (412) 622-3131
      </p>
      <p>
        <small>
          One of the four{' '}
          <a href="https://www.carnegiemuseums.org/">Carnegie Museums of Pittsburgh</a>
        </small>
      </p>
    </div>
    <div className="footer__links">
      <ul>
        <li>
          <a href="https://cmoa.org/art/">Art</a>
        </li>
        <li>
          <a href="https://cmoa.org/visit/">Visit</a>
        </li>
        <li>
          <a href="https://cmoa.org/programs/">Programs</a>
        </li>
        <li>
          <a href="https://cmoa.org/join-give/">Join and Give</a>
        </li>
        <li>
          <a href="https://cmoa.org/calendar/">Calendar</a>
        </li>
        <li>
          <a href="https://cmoa.org/about/">About</a>
        </li>
        <li>
          <a href="https://cmoa.org/private-events/">Private Events</a>
        </li>
        <li>
          <a href="https://cmoa.org/visitor-policies/">Visitor Policies</a>
        </li>
        <li>
          <a href="https://cmoa.org/ccessibility/">Accessibility</a>
        </li>
        <li>
          <a href="http://www.carnegiemuseums.org/interior.php?pageID=11">Careers</a>
        </li>
        <li>
          <a href="http://press.cmoa.org/">Press</a>
        </li>
      </ul>
    </div>
    <div className="footer__social-media">
      <ul>
        <li>
          <a href="http://twitter.com/cmoa" className="bubble" aria-label="Follow CMOA on Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a
            href="http://www.facebook.com/CarnegieMuseumofArt"
            className="bubble"
            aria-label="Follow CMOA on Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li>
          <a
            href="http://instagram.com/thecmoa"
            className="bubble"
            aria-label="Follow CMOA on Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li>
          <a href="http://vimeo.com/cmoa" className="bubble" aria-label="Follow CMOA on Vimeo">
            <FontAwesomeIcon icon={faVimeoV} />
          </a>
        </li>
      </ul>
      <a
        href="https://itunes.apple.com/us/app/carnegie-museum-of-art/id700992890?mt=8"
        className="footer__app-link"
      >
        <InlineSVG src={appStoreLogo} element="span" />
      </a>
    </div>
    <div className="footer__copy">
      &copy; 2017 Carnegie Museum of Art, Carnegie Institute
      <a href="https://cmoa.org/about/terms-of-use/">Terms of Use</a>
      <a href="http://www.carnegiemuseums.org/interior.php?pageID=100">Privacy Policy</a>
    </div>
  </footer>
);

export default Footer;
