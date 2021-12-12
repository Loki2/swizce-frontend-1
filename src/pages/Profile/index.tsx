import React, { useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from '@apollo/client';

import Sidebar from "../../components/Partials/Sidebar";
import Profile from '../../components/User/MyProfile';
import Index from '../../components/Index';
import { MY_SCREAMS } from '../../graphql/User';
import MyScreams from '../../components/User/MyScreams';

interface Props {
  
}

const ProfilePage: React.FC<Props> = () => {

  let getYear = () => {
    let currentYear = new Date().getFullYear();
      return currentYear;
  };

  const {data, loading, error} = useQuery(MY_SCREAMS, {
    fetchPolicy: 'network-only'
  })


  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    //Check if user not authentication navigator to home page
    if (!loggedInUser) {
      // alert('Log in to processed...!')
      router.push("/");
    } else {
      router.push("/Profile");
    }
  }, [loggedInUser]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error</p>;

  const myScreams = data.myInfo.screams;

  return !loggedInUser ? (
    <Index />
  ) : (
    <>
      <Sidebar />
      <div className="profile__page">
        <Profile user={loggedInUser} />       
        <section className="user__scream__post">
          <div className="user__activity__list">
            <h2>My Activities</h2>
            <div className="user__activity__item">
              <ul>
                <li>
                  <a href="#">
                    <i className="ti-shopping-cart-full" />
                    Go Shopping
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-flag" />
                    Work From Home
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-cut" />
                    Feed Pets
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-heart" />
                    Go For Walk
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-eraser" />
                    Read Book
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-home" />
                    Learn Cooking
                  </a>
                </li> 
                <li>
                  <a href="#">
                    <i className="ti-car" />
                    Study Spainish
                  </a>
                </li> 
              </ul>
            </div>

            <div className="copy__right__component">
              <h5>Term of Service, Privacy Policy, <br /> Cookie Policy, Ads info more... </h5>
              <p>&copy;{getYear()} {" "}| Swizce Inc,</p>
            </div>
          </div>
          
          <div className="user__owner_scream">
            <div className="user__scream__list">
              {
                myScreams && 
                myScreams.map((scream) => (
                  <MyScreams scream={scream} key={scream.id} user={loggedInUser}/>
                ))
              }
            </div>
          </div>

          <div className="user__more__actions">
            <div className="user__subscriber__action">
              <div className="user__subscriber__action__item">
                <ul>
                  <li>
                    <a href="#">
                      <i className="ti-heart" />
                      Followers
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-comment" />
                      Talks
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-rss-alt" />
                      Shares
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user__base__information">
              <div className="user__base__information__item">
                <ul>
                  <li>
                    <a href="#">
                      <i className="ti-shopping-cart-full" />
                      Market Place
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
                      House Sweaper
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-home" />
                      Houses Rent
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-car" />
                      Cars Rent
                    </a>
                  </li> 
                </ul>
              </div>
            </div>
            <div className="user__friends__list">
              <div className="user__friends__list__item">
                <ul>
                  <li>
                    <a href="#">
                      <i className="ti-shopping-cart-full" />
                      Market Place
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
                      House Sweaper
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-home" />
                      Houses Rent
                    </a>
                  </li> 
                  <li>
                    <a href="#">
                      <i className="ti-car" />
                      Cars Rent
                    </a>
                  </li> 
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProfilePage;