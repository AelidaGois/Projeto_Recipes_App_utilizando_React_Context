import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="search">
          <input
            data-testid="search-input"
            id="search"
            type="text"
          />
        </label>
        <br />
        <label htmlFor="ingredient-search-radio">
          <input
            name="radio"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            name="radio"
            type="radio"
            data-testid="name-search-radio"
          />
          name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            name="radio"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          first letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
