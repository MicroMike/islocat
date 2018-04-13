import React from 'react';
import { connect } from 'react-redux';
import FormattedMessage from 'IntlFormat';
import { Link } from 'react-router-dom';

// Import Style
import './assets/header.less';

import { switchLanguage } from '../../modules/Intl/IntlActions'

export function Header({ intl, switchLanguage }) {
  const languageNodes = intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => switchLanguage(lang)} className={lang === intl.locale ? 'selected' : ''}>{lang}</li>
  );

  return (
    <header>
      {/* <Link to="/about">About -></Link>
      <Link to="/form">Form -></Link> */}
      <div className='language-switcher'>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
      <div className='content'>
        <h1 className='site-title'>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        <div className='user-type'>
          <h2>
            <Link to="/owner"><FormattedMessage id="owner" /></Link>
          </h2>
          <h2>
            <Link to="/resident"><FormattedMessage id="resident" /></Link>
          </h2>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (store) => ({
  intl: store.intl
})

export default connect(
  mapStateToProps,
  { switchLanguage: switchLanguage }
)(Header);