import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

// Import Style
import './assets/Header.css';

import { switchLanguage } from '../../modules/Intl/IntlActions'

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? 'selected' : ''}>{lang}</li>
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
            <Link to="/owner"><FormattedMessage id="commons.owner" /></Link>
          </h2>
          <h2>
            <Link to="/resident"><FormattedMessage id="commons.resident" /></Link>
          </h2>
        </div>
        {/*
          context.router.isActive('/', true)
            // ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
            : null
        */}
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