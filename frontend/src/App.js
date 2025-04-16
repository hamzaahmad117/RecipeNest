
import { Route, Routes } from "react-router-dom";
import ChefProfile from "./components/ChefProfile";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile"
import RecipePortfolio from "./components/RecipePortfolio";
import Signup from "./components/SignUp";
import Login from "./components/login";
import MeetOurChefs from "./components/MeetOurChefs";
import  ExploreRecipes from "./components/ExploreRecipes";
function App() {



  return (
    <>
    <NavBar />
      <Routes>

      <Route path='/' element={<LandingPage />}> </Route>

        <Route path='/ChefProfile' element={<ChefProfile />}> </Route>
        <Route path='/RecipePortfolio' element={<RecipePortfolio />}> </Route>
        <Route path='/Signup' element={<Signup />}> </Route>
        <Route path='/Login' element={<Login />}> </Route>
        <Route path='/Profile' element={<Profile />}> </Route>
        <Route path='/ourchefs' element={<MeetOurChefs/>}></Route>
        <Route path='/ExploreRecipes' element={<ExploreRecipes/>}></Route>
      </Routes>
    </>










  );
}

export default App;
