import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import "./Main.css";

export const Main = ({
  loading,
  pokemonData,
  urls,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
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
        {urls.prev && <Button handleClick={handlePrevPage} text="前へ" />}
        {urls.next && <Button handleClick={handleNextPage} text="次へ" />}
      </div>
    </div>
  );
};
