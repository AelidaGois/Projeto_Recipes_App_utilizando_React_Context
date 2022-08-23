import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const history = useHistory();

  function userRedirectPage() {
    history.push('/profile');
  }

  function handleEnableBar() {
    setSearchBar(!searchBar);
  }

  function title(props) {
    return <span data-testid="page-title">{props.title}</span>;
  }

  // const { title, enableSearch } = props;
  return (
    <div>
      <h1>{ title }</h1>
      <button type="button" onClick={ userRedirectPage }>
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </button>
      { enableSearch && (
        <button type="button" onClick={ handleEnableBar }>
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </button>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  enableSearch: PropTypes.bool,
}.isRequired;

export default Header;
