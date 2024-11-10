import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Existing imports
import AccsSettings from './components/AccsSettings.jsx';
import CreatedPop from './components/CreatedPop.jsx';
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
import TouristProfile from './components/TouristProfile.jsx';
import TouristSearch from './components/TouristSearch.jsx';
import MuseumForm from './components/MuseumForm.jsx';
import MuseumList from './components/MuseumList.jsx';
import MyActivities from './components/MyActivities.jsx';
import Touristhome from './components/Touristhome.jsx';
import CompanyProfilePage from "./components/CompanyProfilePage.jsx";
import CompanyProfileForm from "./components/CompanyProfileForm.jsx";
import CompanyProfile from "./components/CompanyProfile.jsx";
import ActivityManager from './components/ActivityManager.jsx';
import Sellerhome from './components/Sellerhome.jsx';
import UpdateSeller from './components/UpdateSeller.jsx';
import ItineraryList from './components/ItineraryList.jsx';
import CompanyUpdateForm from './components/CompanyUpdateForm.jsx';
import CreateSeller from './components/CreateSeller.jsx';
import ProfileDetailsPage from './components/ProfileDetailsPage.jsx';
import SearchPageHeader from './components/SearchPageHeader.jsx';
import SiteSearchPage from './components/SiteSearchPage.jsx';
import ActivitySearchPage from './components/ActivitySearchPage.jsx';
import ItinerarySearchPage from './components/ItinerarySearchPage.jsx';
import UpcomingActivities from './components/UpcomingActivities.jsx';
import UpcomingItineraries from './components/UpcomingItineraries.jsx';
import ProductListTourist from './components/ProductListTourist.jsx';
import CreateProfile from './components/CreateProfile.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';
import ProfileView from './components/ProfileView.jsx';
import AdminViewUsers from './components/AdminViewUsers.jsx';
import ItineraryView from './components/ItineraryView.jsx';
import AdvActivity from './components/AdvActivity1.jsx';
import CreateAdvAct from './components/CreateAdvAct.jsx';
import ActivityList2 from './components/ActivityList.2.jsx';
import ProductCardTourist from './components/ProductCardTourist.jsx';
import ComplaintsTable from './components/ComplaintsTable';
import FileComplaint from './components/FileComplaint';
import AccountDeletionRequest from './components/AccountDeletionRequest';
import ChangePassword from './components/ChangePassword';
import DocumentUpload from './components/DocumentUpload';
import GuestHome from './components/GuestHome';
import UploadImagePage from './components/UploadImagePage';
import ArchivedProducts from './components/ArchivedProducts';
import AdminDocumentViewer from './components/AdminDocumentViewer';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import ItinerariesTable from './components/ItinerariesTable';
import FlaggedEvents from './components/FlaggedEvents';
import TransportationBooking from './components/TransportationBooking';
import FlightBooking from './components/FlightBooking';
import PastItineraries from './components/PastItineraries.jsx';
import BookHotel from './components/BookHotel';
<<<<<<< HEAD
import PastActivities from './components/PastActivities';
import BookedTransportations from './components/BookedTransportations'; // New import
=======
import PastActivities from './components/PastActivities';  // Assuming this exists
import PlaceManager from './components/PlaceManager';
import TagManagers from './components/TagManagers.jsx';
import TourismDashboard from './components/TourismDashboard';












>>>>>>> 9fb21a7b0e3164167246813a34f1495f7f5df114

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/log-in-start" element={<LoginForm />} />
          <Route path="/acc-settings" element={<AccsSettings />} />
          <Route path="/created" element={<CreatedPop />} />
          <Route path="/login-tourism" element={<LogInTourism />} />
          <Route path="/login-admin" element={<LogInAdmin />} />
          <Route path="/category-manager" element={<CategoryManager />} />
          <Route path="/tag-manager" element={<TagManager />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/to-do" element={<TodoInput />} />
          <Route path="/middle" element={<MiddleForm />} />
          <Route path="/signuptourist" element={<SignupTourist />} />
          <Route path="/signuptourguide" element={<SignupTourguide />} />
          <Route path="/signupadvertiser" element={<SignupAdvertiser />} />
          <Route path="/signupseller" element={<SignupSeller />} />
          <Route path="/advertiser" element={<Advertiser />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/view-profile/:id" element={<ProfileView />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
<<<<<<< HEAD
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
          <Route path="/tourist-home" element={<Touristhome />} />
          <Route path="/tourist-profile" element={<TouristProfile />} />
          <Route path="/tourist-search" element={<TouristSearch />} />
          <Route path="/company" element={<CompanyProfilePage />} />
          <Route path="/advertisers/create" element={<CompanyProfileForm />} />
          <Route path="/advertisers" element={<CompanyProfile />} />
          <Route path="/amanager" element={<ActivityManager />} />
          <Route path="/seller-home" element={<Sellerhome />} />
          <Route path="/update-seller" element={<UpdateSeller />} />
          <Route path="/company-update" element={<CompanyUpdateForm />} />
          <Route path="/create-seller" element={<CreateSeller />} />
          <Route path="/ProfileDetailsPage" element={<ProfileDetailsPage />} />
          <Route path="/SearchPageHeader" element={<SearchPageHeader />} />
          <Route path="/SiteSearchPage" element={<SiteSearchPage />} />
          <Route path="/ActivitySearchPage" element={<ActivitySearchPage />} />
          <Route path="/ItinerarySearchPage" element={<ItinerarySearchPage />} />
          <Route path="/UpcomingActivities" element={<UpcomingActivities />} />
          <Route path="/UpcomingItineraries" element={<UpcomingItineraries />} />
          <Route path="product-list-tourist" element={<ProductListTourist />} />
          <Route path="advact" element={<AdvActivity />} />
          <Route path="create-act" element={<CreateAdvAct />} />
          <Route path="list" element={<ActivityList2 />} />
          <Route path="/admin-view-users" element={<AdminViewUsers />} />
          <Route path="/product-card-tourist" element={<ProductCardTourist />} />
          <Route path="/complaints" element={<ComplaintsTable />} />
          <Route path="/file-complaint" element={<FileComplaint />} />
          <Route path="/request-account-deletion" element={<AccountDeletionRequest />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/upload-documents" element={<DocumentUpload />} />
          <Route path="/guest-home" element={<GuestHome />} />
          <Route path="/upload-image" element={<UploadImagePage />} />
          <Route path="/archived-products" element={<ArchivedProducts />} />
          <Route path="/admin-documents" element={<AdminDocumentViewer />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/itineraries-table" element={<ItinerariesTable />} />
          <Route path="/flagged-events" element={<FlaggedEvents />} />
          <Route path="/book-transportation" element={<TransportationBooking />} />
          <Route path="/book-flight" element={<FlightBooking />} />
          <Route path="/past-itineraries" element={<PastItineraries />} />
          <Route path="/book-hotel" element={<BookHotel />} />
          <Route path="/past-activities" element={<PastActivities />} />
          <Route path="/my-activities" element={<MyActivities />} />
          <Route path="/museum" element={<MuseumForm />} />
          <Route path="/museum-list" element={<MuseumList />} />
          <Route path="/view-booked-transportations" element={<BookedTransportations />} /> {/* New route */}
=======
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
        <Route path="product-list-tourist" element={<ProductListTourist/>} />
        <Route path="advact" element={<AdvActivity/>} />
        <Route path="create-act" element={<CreateAdvAct/>} />
        <Route path="list" element={<ActivityList2/>} />
        
        <Route path="/admin-view-users" element={<AdminViewUsers/>} /> {/* Route for AdminViewUsers */}
        <Route path="/product-card-tourist" element={<ProductCardTourist />} /> {/* Add this route */}
        <Route path="/complaints" element={<ComplaintsTable />} /> {/* Complaints Page */}
        <Route path="/file-complaint" element={<FileComplaint />} />  {/* Route for filing complaints */}
        <Route path="/request-account-deletion" element={<AccountDeletionRequest />} /> {/* New route */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/upload-documents" element={<DocumentUpload />} />
        <Route path="/guest-home" element={<GuestHome />} />
        <Route path="/upload-image" element={<UploadImagePage />} />
        <Route path="/archived-products" element={<ArchivedProducts />} />
        <Route path="/admin-documents" element={<AdminDocumentViewer />} />
        <Route path="/terms/:userId" element={<TermsAndConditionsPage />} /> {/* Add this line */}
        <Route path="/itineraries-table" element={<ItinerariesTable />} /> {/* Itineraries table route */}
        <Route path="/flagged-events" element={<FlaggedEvents />} /> {/* New route */}
        <Route path="/book-transportation" element={<TransportationBooking />} />
        <Route path="/book-flight" element={<FlightBooking />} /> {/* Add the route here */}
        <Route path="/tourist-past-itineraries" element={<PastItineraries />} />
        <Route path="/book-hotel" element={<BookHotel />} />
        <Route path="/tourist-previous-activities" element={<PastActivities />} />
        <Route path="/places" element={<PlaceManager />} />
        <Route path="/tags" element={<TagManager />} />
        <Route path="/tourism-dashboard" element={<TourismDashboard />} />













>>>>>>> 9fb21a7b0e3164167246813a34f1495f7f5df114
        </Routes>
      </Router>
    </main>
  );
}

export default App;