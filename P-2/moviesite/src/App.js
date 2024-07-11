import logo from './logo.svg';
import './App.css';
import {Route,Routes,BrowserRouter as Router, useLocation} from 'react-router-dom'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Videocards from './components/Videocards';
import Signin from './components/Signin';
import Watchlater from './components/Watchlater';
import Uploadvideo from './components/Uploadvideo';
import Subscriptionvideo from './components/Subscriptionvideo';
import Subscriptionwithoutlogin from './components/Subwithoutlogin';
import Searchoutput from './components/Searchoutput';
import Bigscreen from './components/Bigscreen';
import Watchwithoutlogin from './components/Watchwithoutlogin';
import FullChannel from './components/wholechannel';
import Company from './components/Companydetail';
import Adupload from './components/Adupload';
import Alladvideo from './components/Allad';
import Videoplayer from './components/Videoplayer';
import Notify from './components/Notification';
import Shorts from './components/Shorts';
import Eachvideo from './components/Videoeachuser';
import History from './components/history';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import { useState } from 'react';

//amr update
import AdminPage from './components/AdminLogin';
import AdminMainPage from './components/AdminMainPage'
import AdminShowUser from './components/AdminShowUser';
import AdminShowCompany from './components/AdminShowCompany';

  function App(){


    return (
      <Router>
        {/* <Header /> */}
       {/* <Sidebar className="side" /> */}
    
      <Routes>
       
        <Route path='/' element={<HomePage/>}/>
        <Route path='/subscribe' element={<Subscriptionvideos/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/watchlater' element={<WatchLater/>}/>
        <Route path='/upload' element={<UploadVideo/>}/>
        <Route path='/subscribewithoutlogin' element={<SubscriptionwithoutLogin/>}/>
        <Route path='/search' element={<Searches/>}/>
        <Route path='/bigscreen/:videoid' element={<VideoPlayer/>}/>
        <Route path='watchwithoutlogin' element={<WatchwithoutLogin/>}/>
        <Route path='/whole' element={<Fullchannels key='whole'/>}/>
        <Route path='/company' element={<Companies/>}/>
        <Route path='/uploadad' element={<AdUpload/>}/>
        <Route path='/all_ad/:videoid' element={<AlladVideos/>}/>
        <Route path='/notify' element={<Notifies/>}/>
        <Route path='/shorts' element={<ShortsVideo/>}/>
        <Route path='/eachvideo/:userid' element={<EachVideos/>}/>
        <Route path='/history' element={<Histories/>}/>
        <Route path='/statistics/:videoid' element={<Stat/>}/>
        {/*amar update*/}
        <Route path='/adminpage' element={<AdminPage/>}/>
        <Route path='/admin_main_page' element={<AdminMainPage/>}/>
        <Route path='/admin_show_user' element={<AdminShowUser/>}/>
        <Route path='/admin_show_company' element={<AdminShowCompany/>}/>
        <Route path='/settings' element={<Settingsall/>}/>
      </Routes>
      
    </Router>
      
    );

  }
  function HomePage() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <div className="cardcontainer">
       
        <Videocards />
      </div>
      </>
    );
  }
  function Settingsall() {
    return (
      <>
      {/* <Header /> 
      <Sidebar/> */}
      <Settings/>
      
      </>
    );
  }
  function Subscriptionvideos() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Subscriptionvideo/>
      </>
    );
  }
  function Searches() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Searchoutput/>
      </>
    );
  }
  function SignIn() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Signin/>
      </>
    );
  }
  function WatchLater() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <div className='cardcontainer'><Watchlater/></div>
      
      </>
    );
  }
  function UploadVideo() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Uploadvideo/>
      </>
    );
  }
  function SubscriptionwithoutLogin() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Subscriptionwithoutlogin/>
      </>
    );
  }
  function VideoPlayer() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Videoplayer/>
      </>
    );
  }
  function WatchwithoutLogin() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Watchwithoutlogin/>
      </>
    );
  }
  function Fullchannels() {
    return (
      <>
      <Header /> 
      <Sidebar/>
     <FullChannel/>
      </>
    );
  }
  function Companies() {
    return (
      <>
       <Company/>
      </>
    );
  }
  function AdUpload() {
    return (
      <>
      
     <Adupload/>
      </>
    );
  }
  function AlladVideos() {
    return (
      <>
      <Header /> 
      <Sidebar/>
     <Alladvideo/>
      </>
    );
  }
  function Notifies() {
    return (
      <>
      <Header /> 
      <Sidebar/>
     <Notify/>
      </>
    );
  }
  function ShortsVideo() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Shorts/>
      </>
    );
  }
  function EachVideos() {
    return (
      <>
      <Header /> 
      <Sidebar/>
      <Eachvideo/>
      </>
    );
  }
  function Histories()
  {
    return(
      <>
      <Header /> 
      <Sidebar/>
      <History/>
      </>
    )
  }
  function Stat() {
    return (
      <>
      <Header /> 
      <Sidebar/>
     <Statistics/>
      </>
    );
  }
  
 
  


export default App;
