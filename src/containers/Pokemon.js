import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemon } from '../actions/pokemonActions'
import _ from 'lodash'

export const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon
    const dispatch = useDispatch()
    const pokemonState = useSelector(state => state.Pokemon)
    React.useEffect(()=>{
        dispatch(getPokemon(pokemonName))
    }, [])

    const showData = () =>{
        if(!_.isEmpty(pokemonState.data[pokemonName])){
            const pokeData = pokemonState.data[pokemonName]
            return (
                <div className="pokemon-wrapper">
                    <div className="item">
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default}/>
                        <img src={pokeData.sprites.back_default}/>
                        <img src={pokeData.sprites.front_shiny}/>
                        <img src={pokeData.sprites.back_default}/>
                    </div>
                    <div className="item">
                        <h1>Stats</h1>
                        {pokeData.stats.map(el=> {
                            return <p>{el.stat.name} {el.base_stat}</p>
                        })}
                    </div>
                    <div className="item">
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(el=> {
                            return <p>{el.ability.name}</p>
                        })}
                    </div>
                </div>
            )
        }
        if(pokemonState.loading){
            return <p>...loading</p>
        }
        if(pokemonState.errorMsg!==""){
            return <p>{pokemonState.errorMsg}</p>
        }
        return <p>error getting pokemon</p>
    }
    return (
        <div className="poke">
            <h1>{pokemonName}</h1>
            {showData()}
        </div>
    )
}

export default Pokemon