import React from 'react';

function SearchBar() {
  return (
    <div>
      <legend>Pesquisa</legend>
      <label htmlFor="text">
        <input
          name="text"
          type="text"
          data-testid="search-input"
        />
      </label>
    </div>
  );
}

export default SearchBar;
