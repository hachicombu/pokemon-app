import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./util/api";
import "./App.css";
import { Card } from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";
import { Button } from "./components/Button/Button";

const initialURL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  // ローディング表示
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  // 初期表示
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全データ取得
      const res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);

      // next/prevページURLをセット
      setNextURL(res.next);
      setPrevURL(res.previous); //null

      // ローディング終了
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

  // ページ遷移
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    // 次のページURLをセット
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
        <div className="btnContainer">
          <Button handleClick={handlePrevPage} text="前へ" />
          <Button handleClick={handleNextPage} text="次へ" />
        </div>
      </div>
    </>
  );
}

export default App;
