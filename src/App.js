import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Pokemon from "./containers/Pokemon";
import PokemonList from "./containers/PokemonList";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <nav>
        <NavLink to={"/"}>Search</NavLink>
      </nav>
      <Switch>
        <Route path={"/"} exact component={PokemonList}></Route>
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon}></Route>
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
