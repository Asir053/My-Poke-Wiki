import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemon } from "../actions/pokemonActions";
import _ from "lodash";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import pokeimg from "../assets/pokepoke.jpg";

export const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  React.useEffect(() => {
    dispatch(getPokemon(pokemonName));
  }, []);

  const showData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className='pokemon-wrapper'>
          <div className='item mt-3 col-4 d-none d-md-block d-lg-block '>
            <img
              style={{ width: "180px", height: "180px" }}
              src={pokeData.sprites.front_default}
              alt={""}
            />
            <img
              style={{ width: "180px", height: "180px" }}
              src={pokeData.sprites.back_default}
              alt={""}
            />
            <img
              style={{ width: "180px", height: "180px" }}
              src={pokeData.sprites.front_shiny}
              alt={""}
            />
            <img
              style={{ width: "180px", height: "180px" }}
              src={pokeData.sprites.back_shiny}
              alt={""}
            />
          </div>
          <div className='item mt-5 pt-4 ml-1 col-4 '>
            <div className=' d-block d-md-none d-lg-none '>
              <img
                style={{ width: "120px", height: "120px" }}
                src={pokeData.sprites.front_default}
                alt={""}
              />
            </div>
            <h1>Type(s)</h1>
            <ul style={{ fontWeight: "bold" }}>
              {pokeData.types.map((el) => {
                return <li>{el.type.name}</li>;
              })}
            </ul>
            <div className='mt-5'>
              <h1>Abilities</h1>
              <ul style={{ fontWeight: "bold" }}>
                {pokeData.abilities.map((el) => {
                  return <li>{el.ability.name}</li>;
                })}
              </ul>
            </div>
          </div>

          <div className='item mt-3 col-4 mr-5 pb-5'>
            <h1>Stats</h1>
            {pokeData.stats.map((el) => {
              return (
                <div>
                  <div style={{ fontWeight: "bold" }}>{el.stat.name}</div>
                  <div className='progress'>
                    <div
                      className='progress-done'
                      style={{
                        opacity: 1,
                        width: `${el.base_stat}%`,
                      }}
                    >
                      {el.base_stat}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (pokemonState.loading) {
      return <p>...loading</p>;
    }
    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }
    return <p>error getting pokemon</p>;
  };
  return (
    <div className='container'>
      <div className='poke'>
        <h1 className='text-center pt-2'>{pokemonName.toUpperCase()}</h1>
        {showData()}
      </div>
    </div>
  );
};

export default Pokemon;
