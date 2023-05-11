import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./util/api";
import "./App.css";
import { Card } from "./components/Card";

function App() {
  // ローディング表示
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全データ取得
      const res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);

      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  // 後で切り離し
  // data: array[obj{name,url}]
  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(
      data.map((_data) => {
        return getPokemon(_data.url);
      })
    );
    setPokemonData(pokemonData);
  };
  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
