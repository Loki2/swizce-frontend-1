import React from "react";

interface Props {}

const Setting: React.FC<Props> = () => {

  return (
    <div className="setting__content">
      <section className="setting__main__left">
        <div className="setting__menu__container">
          <h4>Setting Menu</h4>
          <hr />
          <div className="setting__menu__item">
            <ul>
                <li>
                  <a href="#">
                    <i className="ti-book" />
                    General Information
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-settings" />
                    Security And Authorization
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-package" />
                    Information And Backup
                  </a>
                </li>
                <hr /><br />
                <li>
                  <a href="#">
                    <i className="ti-heart" />
                    Public Scream Post
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-user" />
                    Profile And Subscribers
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-eraser" />
                    Following And Tracking
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-na" />
                    Black List Accounts
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-location-arrow" />
                    Location And Mapping
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-map-alt" />
                    Luanguege and Region
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-lock" />
                    Privacy Policy
                  </a>
                </li> 
                <hr /><br />
                <li>
                  <a href="#">
                    <i className="ti-mobile" />
                    Connected Device
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-rocket" />
                    Notification
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-blackboard" />
                    App And Website Connected
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-video-clapper" />
                    Game And Entertainment
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-layout-grid2" />
                    Business Intergrations
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-pulse" />
                    Ads Provider
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-server" />
                    BlockChain Digital Currency
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-credit-card" />
                    Payment Integrations
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="setting__main">
        <div className="setting__container">
          <h4>Setting Information</h4>
          <hr />
        </div>
      </section>

      <section className="setting__main__right">
        <div className="setting__right__container">
          <h4>More Providers</h4>
          <hr />
        </div>
      </section>
    </div>
  );
};

export default Setting;
