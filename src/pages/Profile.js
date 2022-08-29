import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  function handleEmail() {
    const email = JSON.parse(localStorage.getItem('user'));
    return email;
  }

  function cleanLocalStorage() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" enalbleSearchIcon />
      <form>
        <p data-testid="profile-email">{handleEmail()}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ cleanLocalStorage }
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
