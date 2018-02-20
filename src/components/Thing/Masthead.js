import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import SocialLinks from './SocialLinks';

export default class Masthead extends Component {
  state = {
    linkCopied: false,
    shareToolsOpen: false
  };

  openShareTools = () => {
    this.setState(prevState => ({
      shareToolsOpen: !prevState.shareToolsOpen
    }));
  };

  printPage = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  copyLink = () => {
    if (typeof window !== 'undefined') {
      copy(window.location.href);

      setTimeout(() => {
        this.setState({ linkCopied: false });
      }, 2000);

      this.setState({ linkCopied: true });
    }
  };

  render() {
    const { title, images } = this.props;
    const { linkCopied, shareToolsOpen } = this.state;
    const imgLink = `http://collection.cmoa.org/CollectionImage.aspx?irn=${
      images[0].irn
    }&size=Large`;
    return (
      <div>
        <section className="primary pad">
          <div className="l-container">
            <div className="l-full">
              <article className="object">
                <div className="object__image">
                  <img src={imgLink} alt={title} />
                </div>

                <div className="object__actions">
                  <ul>
                    <li className="social-links">
                      <span
                        className={classNames('action', 'social-links__open', {
                          active: shareToolsOpen
                        })}
                        onClick={this.openShareTools}
                      >
                        <FontAwesomeIcon icon="share-square" />
                        <span>Share</span>
                      </span>
                      <SocialLinks {...this.props} />
                    </li>
                    <li>
                      <span className="action" onClick={this.printPage}>
                        <FontAwesomeIcon icon={['far', 'print']} />
                        <span>Print</span>
                      </span>
                    </li>
                    <li>
                      <span href="/" className="action copy-link" onClick={this.copyLink}>
                        <FontAwesomeIcon icon={['far', 'link']} />
                        <span className={classNames('copy-label', { copied: linkCopied })}>
                          Link
                        </span>
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#item-info" className="action">
                        <FontAwesomeIcon icon="info-circle" />
                        <span>Information</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="primary pad">
          <div className="l-container">
            <hr />
          </div>
        </section>
      </div>
    );
  }
}
