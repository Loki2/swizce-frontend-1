import React, { useState } from 'react';

interface Props {}


const AdminSideMenu: React.FC<Props> = () => {
  const [inactive, setInactive] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);

  return (
    <div className={`admin__sidebar ${inactive ? 'inactive': ''}`}>
      <div className="top__section">
        <div className="__profile">
          <img src="https://res.cloudinary.com/swizce/image/upload/v1620702239/Swizce/images/avatar1_c05cmb.png" alt="" />
        </div>

        <div onClick={() => setInactive(!inactive)} className="toggle__menu">
          {inactive ? <i className="ti-arrow-right" /> : <i className="ti-arrow-left" /> }
        </div>
      </div>

      <div className="search__control">
        <button className="btn__search"> 
          <i className="ti-search" />
        </button>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="__divider" />

      <div className="main__menu">
        <ul>
          <li>
            <a href="/Admin" className="menu__item">
              <div className="menu__icon">
              <i className="ti-palette" />
              </div>
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a onClick={() => setExpand(!expand)} className= "menu__item">
              <div className="menu__icon">
              <i className="ti-user" />
              </div>
              <span style={{ cursor: 'pointer' }}>Users Account</span>
            </a>
            <ul className={`sub__menu ${expand ? "active": ""}`}>
              <li>
                <a href="/Admin/user/User">Profile</a>
              </li>
              <li>
                <a href="/Profile">Hometown Address</a>
              </li>
              <li>
                <a href="/Profile">Current Address</a>
              </li>
              <li>
                <a href="/Profile">Profile</a>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={() => setExpand1(!expand1)}  className="menu__item">
              <div className="menu__icon">
              <i className="ti-desktop" />
              </div>
              <span style={{ cursor: 'pointer' }}>Management</span>
            </a>
            <ul className={`sub__menu ${expand1 ? "active": ""}`}>
              <li>
                <a href="/Profile">Profile</a>
              </li>
              <li>
                <a href="/Profile">Hometown Address</a>
              </li>
              <li>
                <a href="/Profile">Current Address</a>
              </li>
              <li>
                <a href="/Profile">Profile</a>
              </li>
            </ul>
          </li>

          <li>
            <a onClick={() => setExpand2(!expand2)} className="menu__item">
              <div className="menu__icon">
              <i className="ti-stats-up" />
              </div>
              <span style={{ cursor: 'pointer' }}>Analyst Reports</span>
            </a>
            <ul className={`sub__menu ${expand2 ? "active": ""}`}>
              <li>
                <a href="/Profile">Profile</a>
              </li>
              <li>
                <a href="/Profile">Hometown Address</a>
              </li>
              <li>
                <a href="/Profile">Current Address</a>
              </li>
              <li>
                <a href="/Profile">Profile</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>


      <div className="sider__footer">
        <div className="__avatar">
          <img src="https://res.cloudinary.com/swizce/image/upload/v1620702239/Swizce/images/avatar1_c05cmb.png" alt="" />
        </div>

        <div className="user__info">
          <h5>Loki Rixnickz</h5>
          <p>rixnickz@swizce.com</p>
        </div>
      </div>
    </div>
  )
}

export default AdminSideMenu
