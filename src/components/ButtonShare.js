import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  const [stateLink, setStateLink] = useState(false);
  const { href } = document.location;
  const handleClick = () => {
    const url = href.split('/in-progress')[0];
    const twoSeconds = 2000;
    clipboardCopy(url);
    setStateLink(true);
    setTimeout(() => {
      setStateLink(false);
    }, twoSeconds);
  };
  return (
    <div>
      {stateLink ? <p>Link copied!</p> : ''}
      <button
        onClick={ handleClick }
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="botão compartilhar" />
      </button>
    </div>
  );
}
export default ButtonShare;
