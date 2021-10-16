import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import pokeimg from "../assets/pokepoke.jpg";

export const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  React.useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page = 1) => {
    dispatch(getPokemonList(page));
  };

  const showData = () => {
    if (pokemonList.loading) {
      return <p>...loading</p>;
    }

    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className='list-wrapper'>
          {pokemonList.data.map((el) => {
            return (
              <div className='pokemon-item' style={{ fontWeight: "bold" }}>
                <p>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            );
          })}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }
    return <p>Unable to get data</p>;
  };
  return (
    <div className='container'>
      {/* <div className='search-wrapper'>
        <p>Search:</p>
        <input type='search' onChange={(e) => setSearch(e.target.value)} />
        <button
          className='btn btn-secondary'
          onClick={() => props.history.push(`/pokemon/${search}`)}
        >
          Search
        </button>
      </div> */}

      <div className='search-wrapper input-group'>
        <div className='form-outline'>
          <input
            type='search'
            id='form1'
            className='form-control'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type='button'
          className='btn '
          onClick={() => props.history.push(`/pokemon/${search.toLowerCase()}`)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {showData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => fetchData(data.selected + 1)}
          containerClassName='pagination'
        />
      )}
    </div>
  );
};

export default PokemonList;
