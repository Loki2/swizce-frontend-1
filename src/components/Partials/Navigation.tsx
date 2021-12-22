import React, { useContext } from "react";
import { useMutation } from '@apollo/client';
import { AuthContext } from "../../context/AuthContext";
import { isAdmin } from "../../helpers/authHelper";
import { SIGN_OUT } from '../../graphql/User';
import { useRouter } from 'next/router';
import { User } from "../../types";

interface NavigationProps {
  user: User
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  
  const { handleAuthAction, setAuthUser } = useContext(AuthContext);

  const [signout] = useMutation<{signout: {message: string}}>(SIGN_OUT);

  const router = useRouter();

  
  // console.log("User Logged in on Navigation!:", loggedInUser);

  //create call singout function
  const handleSignout = async () => {
    try {
      const response = await signout();

      if(response?.data?.signout?.message){
        //Set Auth user to null
        setAuthUser(null);

        //Sync Signout
        window.localStorage.setItem('signout', Date.now().toString())

        //push user to Signin Page
        router.push('/')
      }
    } catch (error) {
      alert('Sorry can not proceed...!')
    }
  }

  //  console.log("user logged in:", loggedInUser)
  return !user ? (
    <>
      <div className="navigation__not__authorize">
        <div className="navigation__logo">
          <a href="/">
              <img src="https://res.cloudinary.com/swizce/image/upload/v1620702365/Swizce/icons/swizce_aez2ms.png" height="34px" />
          </a>
        </div>
        <div className="swizce__navigation__link">
          <a onClick={() => handleAuthAction('signin')} style={{ cursor: 'pointer'}}>
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/login_qgoycx.png"
              width="32px"
              height="32px"
            />
          </a>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="navigation__authenticated">
        <div className="navigation__logo">
          <a href="/">
              <img src="https://res.cloudinary.com/swizce/image/upload/v1620702365/Swizce/icons/swizce_aez2ms.png" height="34px" />
          </a>
        </div>
        <div className="navigation__friends__list">
          <ul>
            <li>
              <a href="">
                <img src="https://assets.vogue.com/photos/60eef8c728198051b1f04558/1:1/w_1475,h_1475,c_limit/tgd3260_101_comp_v007_35250b79%20(2).jpeg"  className="btn" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://i.redd.it/mh7s3m7igys21.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://img.freepik.com/free-vector/ship-captain-wheel-isolated-white-background_7496-1004.jpg?size=338&ext=jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://res.cloudinary.com/swizce/image/upload/v1620702350/Swizce/icons/test_roevfj.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://i.insider.com/5ab40aa2a5ac361d008b4780?width=700" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://m.media-amazon.com/images/I/61Bx7HZwXGL._AC_SL1300_.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://bbts1.azureedge.net/images/p/full/2020/07/0f7de760-48a5-4b66-8fbe-307c83f5d2d0.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://res.cloudinary.com/swizce/image/upload/v1620702350/Swizce/icons/test_roevfj.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://i.insider.com/5ab40aa2a5ac361d008b4780?width=700" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://m.media-amazon.com/images/I/61Bx7HZwXGL._AC_SL1300_.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://i.redd.it/mh7s3m7igys21.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://img.freepik.com/free-vector/ship-captain-wheel-isolated-white-background_7496-1004.jpg?size=338&ext=jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div className="navigation__search__engine">
          <input type="search" name="search" id="search" placeholder="Search on Swizce..."/>
        </div>
        <div className="navigation__link">
          <a style={{ cursor: 'pointer'}}>
            <img
                src="https://res.cloudinary.com/swizce/image/upload/v1638441532/Swizce/images/digital-wallet_yclr8n.png"
                width="32px"
                height="32px"
              />
            </a>     
        </div>
        <div className="navigation__link">
          <a style={{ cursor: 'pointer'}}>
            <img
                onClick={() => router.push('/Defi')}
                src="https://res.cloudinary.com/swizce/image/upload/v1638441232/Swizce/images/big-data_yxpu2d.png"
                width="32px"
                height="32px"
              />
            </a>     
        </div>
        <div className="navigation__link">
          <a style={{ cursor: 'pointer'}}>
            <img
                src="https://res.cloudinary.com/swizce/image/upload/v1638441365/Swizce/images/ethereum_mobgvd.png"
                width="32px"
                height="32px"
              />
            </a>     
        </div>
        <div className="navigation__link">
          <a style={{ cursor: 'pointer'}}>
            <img
                onClick={handleSignout}
                src="https://res.cloudinary.com/swizce/image/upload/v1622518178/Swizce/images/log-out_aqu0w7.png"
                width="32px"
                height="32px"
              />
            </a>     
        </div>
      </div>
    </>
  );
};

export default Navigation;
