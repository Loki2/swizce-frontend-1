import React, { useEffect, useState } from "react";
import { Service, User } from '../../types';


interface Props {
  service: Service,
  user: User
}

const Service: React.FC<Props> = ({ service, user }) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {lat: "", lng: ""}
  })

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

  useEffect(() => {
    if( !("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geo Location not Supported"
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);


  return (
    <li>
      <a href="">
        <div className="service__item">
          <div className="service__head">
            <img
              src={service.imageUrl}
              alt="service_image_url"
            />
          </div>
          <div className="service__content">
            <div className="__body">
              <h2>Name: {service.name}</h2>
              <h2>Description: {service.description}</h2>
              <span>Tags: { service.tags }</span>
              <h3>Contact: {service.contact}</h3>
              <h3>
                Address: {service.address} <br />
                Location:{" "}
                {location.loaded
                  ? JSON.stringify(location)
                  : "ອານຸຍາດໃຫ້ເຂົາເຖີ່ງທີ່ຢູ່ປະຈຸບັນຂອງທ່ານ? ເພື່ອເຊັກບໍລິການອຳນວຍຄວາມສະດວກຕ່າງໆທີ່ຢູ່ໃກ້ທ່ານ"}
              </h3>
              <h3>rating: </h3>
            </div>
            <div className="__footer">
              {
                user && user.id === service.user.id ? (
                  <a href="#">Update or Promote !</a>
                ):(
                  <a href="#">Book Now!</a>
                )
              }              
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Service;
