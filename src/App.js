import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./util/api";
import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";

function App() {
  // ローディング表示
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  // {prev, next}
  const [urls, setURLs] = useState({});

  // 初期表示
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全データ取得（URL）
      const res = await getAllPokemon();

      // 各ポケモンの詳細データを取得
      loadPokemon(res.results); // name,url

      // next/prevページURLをセット
      setURLs({ ...urls, next: res.next });

      // ローディング終了z
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

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
    setLoading(true);
    const data = await getPokemon(urls.prev);
    await loadPokemon(data.results);
    setURLs({ ...urls, prev: data.previous, next: data.next });
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    const data = await getPokemon(urls.next);
    await loadPokemon(data.results);
    // 次のページURLをセット
    setURLs({ ...urls, prev: data.previous, next: data.next });
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <Main
        loading={loading}
        pokemonData={pokemonData}
        urls={urls}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  );
}

export default App;
