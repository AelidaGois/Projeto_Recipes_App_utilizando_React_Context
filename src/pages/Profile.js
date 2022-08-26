import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" enalbleSearchIcon />
      <form>
        <label htmlFor="input-email">
          <input
            data-testid="profile-email"
            name="email"
            placeholder="Digite seu email"
          />
        </label>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorites Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
