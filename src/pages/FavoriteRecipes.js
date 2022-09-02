import React, {
  // useContext
  useEffect,
  useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
// import ContextApp from '../context/ProviderApp';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setfavoriteRecipes] = useState([]);
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
  // REQUISITO 53 //
  const hadleCopyLink = (type, id) => {
    setCopiedLink(id);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  // REQUISITO 54 //
  // FUNÇÃO QUE SETA O LOCAL STORAGE DAS COMIDAS E BEBIDAS SELECIONADAS COMO FAVORITAS //
  const handleLocalFavoriteStorage = (currentId) => {
    // CRIAÇÃO DA STORAGE DE FAVORITOS //
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    // FAVORITA E DESFAVORITA COMIDA SELECIONADA DA LISTA //
    const newFavorites = favoriteStorage.filter(({ id }) => id !== currentId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setfavoriteRecipes(newFavorites);
  };

  useEffect(() => {
    const setLocalStorage = () => {
      const storage = localStorage.getItem('favoriteRecipes');
      const favorites = storage ? JSON.parse(storage) : [];
      setfavoriteRecipes(favorites);
    };
    setLocalStorage();
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />

      {/* REQUISITO 55 - CRIAÇÃO DE BOTÕES QUE FILTRAM RECEITAS */}
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
          Drinks
        </button>
      </div>

      {/* TODOS OS TEST-IDS FORAM RETIRADOS DO REQUISITO REQUISITO 44 */}
      {/* REQUISITO 50 - ACUMULA TODOS ESSES TEST-IDS */}
      { !!favoriteRecipes.length && (
        <div>
          {/* REQUISITO 51 - ADICIONA FOTO, NOME, CATEGORIA, NACIONALIDADE E BOTAO SHARE E DESFAVORITAR */}
          {/* REQUISITO 52 - ADICIONA FOTO, NOME, SE É ALCÓLICA OU NÃO E BOTAO SHARE E DESFAVORITAR */}
          {
            favoriteRecipes.filter(({ type }) => filter === 'all' || type === filter)
              .map(({
                image,
                name,
                category,
                nationality,
                alcohol,
                type,
                id,
              }, index) => (
                <div
                  key={ `${id}-${index}` }
                >

                  {/* REQUISITO 56 - REDIRECIONA A PESSOA USUÁRIA AO CLICAR NA FOTO OU NOME */}
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ image }
                      alt={ `${name}` }
                      style={ { width: '250px' } }
                    />
                  </Link>
                  <Link to={ `/${type}s/${id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}
                    </p>
                  </Link>
                  {/* REQUISITO 56 */}

                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {type === 'food' ? `${nationality} - ${category}` : alcohol}
                  </p>
                  <button
                    type="button"
                    onClick={ () => hadleCopyLink(type, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share-icon"
                    />
                  </button>

                  {/* REQUISITO 53 - COPIA LINK */}
                  {copiedLink === id
                  && (
                    <span>
                      Link copied!
                    </span>
                  )}

                  {/* REQUISITO 54 - FAVORITA E DESFAVORITA RECEITA POR BOTÃO */}
                  <button
                    type="button"
                    onClick={ () => handleLocalFavoriteStorage(id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="fav-icon"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              ))
          }
        </div>
      )}

    </div>
  );
}
