export const getAllPokemon = (url) => {
  return fetch(url).then((res) => res.json());
};

// url: ポケモン詳細ページURL
export const getPokemon = (url) => {
  return fetch(url).then((res) => res.json());
};
