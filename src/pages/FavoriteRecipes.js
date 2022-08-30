import React, {
  // useContext
  useEffect,
  useState } from 'react';
import copy from 'clipboard-copy';
// import ContextApp from '../context/ProviderApp';

import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [copiedLink, setCopiedLink] = useState('');

  // const {
  //   favoriteRecipes,
  //   setFavoriteRecipes,
  //   filter,
  //   setFilter,
  //   copiedLink,
  //   setCopiedLink } = useContext(ContextApp);

  // FUNÇÃO QUE COPIA O LINK DA COMIDA E SEU ID PARA COMPARTILHAMENTO //
  const hadleCopyLink = (type, id) => {
    setCopiedLink(id);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  // FUNÇÃO QUE SETA O LOCAL STORAGE DAS COMIDAS E BEBIDAS SELECIONADAS COMO FAVORITAS //
  const handleLocalFavoriteStorage = (prevId) => {
    // CRIAÇÃO DA STORAGE DE FAVORITOS //
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    // FAVORITA E DESFAVORITA COMIDA SELECIONADA DA LISTA //
    const newStorage = storage.filter(({ id }) => id !== prevId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));

    setFavoriteRecipes(newStorage);
  };

  useEffect(() => {
    const getLocalStorage = () => {
      const storage = localStorage.getItem('favoriteRecipes');
      const favorites = storage ? JSON.parse(storage) : [];
      setFavoriteRecipes(favorites);
    };
    getLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drink
        </button>
      </div>
    </div>
  );
}
