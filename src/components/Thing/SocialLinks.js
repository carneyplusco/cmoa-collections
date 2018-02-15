import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import shortid from 'shortid';
import queryString from 'query-string';

export default class SocialLinks extends Component {
  sharePage = (url, windowOpts) => {
    if (typeof window !== 'undefined') {
      const { width, height } = windowOpts;
      const top = Math.max(0, (window.screen.height - height) / 2);
      const left = Math.max(0, (window.screen.width - width) / 2);
      const specs = `height=${height},width=${width},top=${top},left=${left},status=0,toolbar=0,directories=0,location=0,menubar=0,resizable=1,scrollbars=1`;

      window.open(url, `share-${shortid.generate()}`, specs);
    }
  };

  shareFacebook = () => {
    if (typeof window !== 'undefined') {
      const windowOpts = {
        width: 600,
        height: 368
      };
      const params = {
        'p[url]': window.location.href,
        'p[title]': this.props.title
      };
      this.sharePage(
        `http://www.facebook.com/sharer.php?${queryString.stringify(params)}`,
        windowOpts
      );
    }
  };

  shareTwitter = () => {
    if (typeof window !== 'undefined') {
      const windowOpts = {
        width: 600,
        height: 258
      };
      const params = {
        text: `${this.props.title} - ${window.location.href}`,
        via: 'cmoa'
      };
      this.sharePage(
        `http://twitter.com/intent/tweet?${queryString.stringify(params)}`,
        windowOpts
      );
    }
  };

  shareEmail = () => {
    if (typeof window !== 'undefined') {
      const params = {
        su: this.props.title,
        subject: this.props.title,
        body: `${this.props.title} - ${window.location.href}`
      };
      window.location.href = `mailto:?${queryString.stringify(params)}`;
    }
  };
  render() {
    return (
      <div className="social-links__services">
        <span className="social-link" aria-label="Share on Facebook" onClick={this.shareFacebook}>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </span>
        <span className="social-link" aria-label="Share on Twitter" onClick={this.shareTwitter}>
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </span>
        <span className="social-link" aria-label="Share via Email" onClick={this.shareEmail}>
          <FontAwesomeIcon icon="envelope" />
        </span>
      </div>
    );
  }
}
