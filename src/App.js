import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Pokemon from "./containers/Pokemon";
import PokemonList from "./containers/PokemonList";
import "./App.css";
import pokelogo from "./assets/pokelogo.jpg";

function App() {
  return (
    <div className='App'>
      <nav className='sticky-top'>
        <div class='navbar-brand pl-5 text-white'>
          {/* <img
            src={pokelogo}
            alt={""}
            style={{ width: "125px", height: "45px" }}
          ></img> */}
          PokéWiki
        </div>
        <NavLink className='home' to={"/"}>
          Home
        </NavLink>
      </nav>
      <div className='container-fluid'>
        <Switch>
          <Route path={"/"} exact component={PokemonList}></Route>
          <Route path={"/pokemon/:pokemon"} exact component={Pokemon}></Route>
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
