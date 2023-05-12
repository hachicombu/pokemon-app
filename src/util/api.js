import axios from "axios";

const initialURL = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemon = async () => {
  const result = await axios.get(initialURL);
  return result.data;
};

// url: ポケモン詳細URL
// mapで繰り返し呼ばれる
export const getPokemon = async (url) => {
  const result = await axios.get(url);
  return result.data;
};
