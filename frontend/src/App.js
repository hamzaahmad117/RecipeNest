
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
import MyProfile from "./components/MyProfile";
function App() {



  return (
    <>
    <NavBar />
      <Routes>

      <Route path='/' element={<LandingPage />}> </Route>
      <Route path='/chef-profile' element={<ChefProfile />}> </Route>

        <Route path='/MyProfile' element={<MyProfile />}> </Route>
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
