import AccsSettings from './components/AccsSettings.jsx'
import CreatedPop from './components/CreatedPop.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInAdmin from './components/LogInAdmin.jsx';
import LogInTourism from './components/LogInTourism.jsx';
import AddProduct from './components/AddProduct.jsx';
import CategoryManager from './components/CategoryManager.jsx';
import CategoryForm from './components/CategoryForm.jsx';
import CategoryList from './components/CategoryList.jsx';
import TagManager from './components/TagManager.jsx';
import TagForm from './components/TagForm.jsx';
import TagList from './components/TagList.jsx';
import ProductList from './components/ProductList.jsx';
import MiddleForm from './components/MiddleForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupTourist from './components/SignupTourist.jsx';
import SignupTourguide from './components/SignupTourguide.jsx';
import SignupAdvertiser from './components/SignupAdvertiser.jsx';
import SignupSeller from './components/SignupSeller.jsx';
import Advertiser from './components/Advertiser.jsx';
import TodoInput from './components/TodoInput.jsx';
import TourGuideItinerary from './components/TourGuideItinerary.jsx';  
import CreateItinerary from './components/CreateItinerary.jsx'; 
import ReadItinerary from './components/ReadItinerary.jsx';  
import UpdateItinerary from './components/UpdateItinerary.jsx';  
import DeleteItinerary from './components/DeleteItinerary.jsx';  
import TouristItinerary from './components/TouristItinerary.jsx'; 
import CreateItineraryTourist from './components/CreateItineraryTourist.jsx'; 
import ReadItineraryTourist from './components/ReadItineraryTourist.jsx'; 
import UpdateItineraryTourist from './components/UpdateItineraryTourist.jsx'; 
import DeleteItineraryTourist from './components/DeleteItineraryTourist.jsx';
import TouristProfile from './components/TouristProfile.jsx'; // Adjust path if necessary
import TouristSearch from './components/TouristSearch.jsx';
import MuseumForm from './components/MuseumForm.jsx';
import MuseumList from './components/MuseumList.jsx';
import MyActivities from './components/MyActivities.jsx';
import Touristhome from './components/Touristhome.jsx';
import CompanyProfilePage from "./components/CompanyProfilePage.jsx";
import CompanyProfileForm from "./components/CompanyProfileForm.jsx";
import CompanyProfile from"./components/CompanyProfile.jsx";
import ActivityManager from './components/ActivityManager.jsx';
import Sellerhome from './components/Sellerhome.jsx';
import UpdateSeller from './components/UpdateSeller.jsx';
import ItineraryList from './components/ItineraryList.jsx';
import CompanyUpdateForm from './components/CompanyUpdateForm.jsx';
import CreateSeller from './components/CreateSeller.jsx';
import ProfileDetailsPage from './components/ProfileDetailsPage.jsx';
import SearchPageHeader from './components/SearchPageHeader.jsx';
import SiteSearchPage from './components/SiteSearchPage.jsx'; // Your search components
import ActivitySearchPage from './components/ActivitySearchPage.jsx';
import ItinerarySearchPage from './components/ItinerarySearchPage.jsx';
import UpcomingActivities from './components/UpcomingActivities.jsx';
import UpcomingItineraries from './components/UpcomingItineraries.jsx';
import ProductListTourist from './components/ProductListTourist.jsx';
import CreateProfile from './components/Createprofile.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';
import ProfileView from './components/ProfileView.jsx'; // Update the import
import ItineraryView from './components/ItineraryView.jsx'; 
import AdvActivity from './components/AdvActivity1.jsx';
import CreateAdvAct from './components/CreateAdvAct.jsx';
import ActivityList2 from './components/ActivityList.2.jsx';


function App() {

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />  {/* Set LoginForm as the default route */}
          <Route path="/log-in-start" element={<LoginForm />} />  {/* Route for LoginForm */}
          <Route path="/acc-settings" element={<AccsSettings />} />  {/* Route for the AccsSettings component */}
          <Route path="/created" element={<CreatedPop />} />  {/* Route for the DeletedPop component */} 
          <Route path="/login-tourism" element={<LogInTourism />} />
          <Route path="/login-admin" element={<LogInAdmin />} />
          <Route path="/category-manager" element={<CategoryManager />} /> {/* Add this route */}
          <Route path="/tag-manager" element={<TagManager />} /> {/* Add this route */}
          <Route path="/product-list" element={<ProductList />} />  {/* Route for ProductList */}
          <Route path="/add-product" element={<AddProduct />} />  {/* Route for AddProduct */}
          <Route path="/to-do" element={<TodoInput />} />  {/* Route for TodoInput */}
          <Route path="/middle" element={<MiddleForm />} />
          <Route path="/signuptourist" element={<SignupTourist />} />
          <Route path="/signuptourguide" element={<SignupTourguide />} />
          <Route path="/signupadvertiser" element={<SignupAdvertiser />} />
          <Route path="/signupseller" element={<SignupSeller />} />
          <Route path="/advertiser" element={<Advertiser />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/view-profile/:id" element={<ProfileView />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/tour-guide-itinerary" element={<TourGuideItinerary />} />
        <Route path="/create-itinerary" element={<CreateItinerary />} />
        <Route path="/itinerary-view/:id" element={<ItineraryView />} />
        <Route path="/read-itinerary" element={<ReadItinerary />} />
        <Route path="/itinerariesList" element={<ItineraryList />} />
        <Route path="/update-itinerary" element={<UpdateItinerary />} />
        <Route path="/delete-itinerary" element={<DeleteItinerary />} />
        <Route path="/tourist-itinerary" element={<TouristItinerary />} />
        <Route path="/create-itinerary-tourist" element={<CreateItineraryTourist />} />
        <Route path="/read-itinerary-tourist" element={<ReadItineraryTourist />} />
        <Route path="/update-itinerary-tourist" element={<UpdateItineraryTourist />} />
        <Route path="/delete-itinerary-tourist" element={<DeleteItineraryTourist />} />
        <Route path="/tourist-home" element={<Touristhome />} /> {/* Correct route for Touristhome */}
        <Route path="/tourist-profile" element={<TouristProfile />} /> {/* Route for TouristProfile */}
        <Route path="/tourist-search" element={<TouristSearch />} />  {/* Route for TouristSearch */}
        <Route path="/company" element={<CompanyProfilePage/>} />
        <Route path="/advertisers/create" element={<CompanyProfileForm/>} />
        <Route path="/advertisers" element={<CompanyProfile/>} />
        <Route path="/amanager" element={<ActivityManager/>} />
        <Route path="/seller-home" element={<Sellerhome />} />
        <Route path="/update-seller" element={<UpdateSeller />} />
        <Route path="/company-update" element={<CompanyUpdateForm />} />
        <Route path="/create-seller" element={<CreateSeller />} /> {/* Route for CreateSeller */}
        <Route path="/ProfileDetailsPage" element={<ProfileDetailsPage/>}/>
        <Route path="/SearchPageHeader" element={<SearchPageHeader/>} />
        <Route path="/SiteSearchPage" element={<SiteSearchPage/>} />
        <Route path="/ActivitySearchPage" element={<ActivitySearchPage/>} />
        <Route path="/ItinerarySearchPage" element={<ItinerarySearchPage/>} />
        <Route path="/UpcomingActivities" element={<UpcomingActivities/>} />
        <Route path="/UpcomingItineraries" element={<UpcomingItineraries/>} />
        <Route path="/UpcomingItineraries" element={<UpcomingItineraries/>} />
        <Route path="product-list-tourist" element={<ProductListTourist/>} />
        <Route path="advact" element={<AdvActivity/>} />
        <Route path="create-act" element={<CreateAdvAct/>} />
        <Route path="list" element={<ActivityList2/>} />
        
        

        </Routes>
      </Router>
    </main>
  );
}

export default App;



