import React, { useContext, useState, useEffect }from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { QUERY_SERVICE } from '../../graphql/Service';

import Service from "../../components/Service/Service";
import { AuthContext } from "../../context/AuthContext";

import Sidebar from "../../components/Partials/Sidebar";
import Rightbar from "../../components/Partials/Rightbar";
import Index from "../../components/Index";

interface Props {}

const Services: React.FC<Props> = () => {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
      return currentYear;
  };


  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {lat: "", lng: ""}
  })

  const { loggedInUser, handleAuthAction } = useContext(AuthContext);

  //Query Service from database
  const {data, loading, error} = useQuery(QUERY_SERVICE, {
    fetchPolicy: 'network-only'
  })

  const router = useRouter();


  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
    })
  }

  const onError = (error: any) => {
    setLocation(error,
        // {
        //   loaded: true,
        //   error: {}
        // }
      );
  }

  // console.log("User Logged in: ", loggedInUser);

  useEffect(() => {
    //Check if user not authentication navigator to home page
    if (!loggedInUser) {
      // alert('Log in to processed...!')
      router.push("/");
    } else {
      router.push("/Services");
    }
  }, [loggedInUser]);


  useEffect(() => {
    if( !("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geo Location not Supported"
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error</p>;

  return !loggedInUser ? (
    <Index />
  ) : (
    <>
    <Sidebar />
      <div className="service__page">
        <section className="service__main">
            <div className="service__category__list">
              <div className="__add__service">
                <a onClick={() => handleAuthAction('create-service')}>
                  <i className="ti-plus" />
                    ADD NEW SERVICE
                </a>
              </div>
              <h1>Service Categories</h1>
              <hr />
              <div className="service__category__item">
                <ul>
                  <li>
                    <a href="#">
                      <i className="ti-shopping-cart-full" />
                      Market Place
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-truck" />
                      Logistic And Transport
                    </a>
                  </li>                   
                 
                  <li>
                    <a href="#">
                      <i className="ti-cut" />
                      Electrict Repair
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-heart" />
                      Salons Beauty
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-eraser" />
                      Cleaner And Sweaper
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-flag" />
                      Cars Modifier
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-home" />
                      Houses And Land
                    </a>
                  </li> 

                  <li>
                    <a href="#">
                      <i className="ti-car" />
                      Cars And Bike
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-dribbble" />
                      Taxi And Drivers
                    </a>
                  </li> 
                  
                  <li>
                    <a href="#">
                      <i className="ti-drupal" />
                      Hotels and Guesthouse
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-layout-grid2" />
                      Restaurant And Bars
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-music-alt" />
                      Multimedia & Modelling
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-help-alt" />
                      Hospital And Clinic
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-map-alt" />
                      Tourist And Park
                    </a>
                  </li> 
                </ul>
              </div>
              <div className="copy__right__component">
                <h5>Term of Service, Privacy Policy, <br /> Cookie Policy, Ads info more...</h5>
                <p>&copy;{getYear()} {" "}| Swizce Inc,</p>
              </div>
            </div>
            
            

            {/* main container */}
            <div className="service__container">
                <ul>
                  {
                    data &&
                    data.services.map((service) => (
                      <Service service={service} key={service.id} user={loggedInUser} />
                    ))
                  }
                </ul>          
            </div>
          
            <div className="service__right__tabs">
              <h1>Premium Sponsors</h1>            
              <div className="service__sponsors__container">
                <hr />
                <ul>
                  <li>
                    <a href="">
                      <div className="service__sponsors__item">
                        <img src="https://d2ofqe7l47306o.cloudfront.net/games/1920x1080/kena-bridge-of-spirits-rot-wisp.jpg" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="service__sponsors__item">
                        <img src="https://assets-prd.ignimgs.com/2021/09/20/kena-bridge-of-spirits-photo-mode-05-1632147335829.jpg" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="service__sponsors__item">
                        <img src="https://c4.wallpaperflare.com/wallpaper/250/991/734/kena-bridge-of-spirits-4k-game-cg-rot-kena-hd-wallpaper-preview.jpg" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="service__sponsors__item">
                        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/kena-bridge-of-spirits-ps4-ps5-wallpapers-19.jpg" alt="" />
                      </div>
                    </a>
                  </li>
                </ul>              
              </div>
              
            </div>
          </section>
        </div>
      <Rightbar user={loggedInUser} />
    </>
  );
};

export default Services;
