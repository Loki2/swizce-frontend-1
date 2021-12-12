import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { VscCircuitBoard } from 'react-icons/vsc';

interface Props {}

const Sidebar: React.FC<Props> = () => {

  const { handleAuthAction } = useContext(AuthContext);


  return (
    <>
      <section className="sidebar__menu">
        <div className="sidebar">
          <a href="/">
          <img
              src="https://res.cloudinary.com/swizce/image/upload/v1628913730/Swizce/images/xing_1_wph9g5.png" width="32px"
              className="btn icons"
            />
          </a>
          <br />
          <br />
          <a href="/Screams">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/scream6_h6eglb.png"
              className="btn icons"
            />
          </a>
          <br />
          <br />
          <a href="/Services">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702242/Swizce/images/service4_zh28nk.png"
              className="btn icons"
            />
          </a>
          <br />
          <br />
          <button>
            <a style={{ cursor: 'pointer' }} onClick={() => handleAuthAction('create')}>
              <img
                src="https://res.cloudinary.com/swizce/image/upload/v1620702239/Swizce/images/add1_v8d3fj.png"
                className="btn icons active"
              />
            </a>
          </button>
         
          <br />
          <br />
          <a href="/Messagers">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/notification4_ov6pw3.png"
              className="btn icons"
            />
          </a>
          <br />
          <br />
          <a href="/Profile">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/profile3_tl2cfr.png"
              className="btn icons"
            />
          </a>
          <br />
          <br />
          <a href="/Settings">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702242/Swizce/images/Setting_sbfw5z.png"
              className="btn icons"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
