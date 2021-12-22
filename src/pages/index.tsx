import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { QUERY_SCREAMS } from "../graphql/Scream";

import Home from "../components/Home/Home";
import Sidebar from "../components/Partials/Sidebar";
import Rightbar from "../components/Partials/Rightbar";
import Index from "../components/Index";

interface Props {}

const Start: React.FC<Props> = () => {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  };

  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  const { data, loading } = useQuery(QUERY_SCREAMS, {
    fetchPolicy: "network-only",
  }); //<{ screams: Scream[], user: User }>

  useEffect(() => {
    //if user is not authenticated pusg to home page
    if (!loggedInUser) {
      // alert('Log in to processed...!')
        router.push("/");
      } else {
            router.push("/");
      }
    }, [loggedInUser]);

  if (loading) return <p>Loading ...</p>;

  return !loggedInUser ? (
    <Index />
  ) : (
    <>
      <Sidebar />
      <div className="home__page">
        <section className="home__left">
          <div className="home__left__contents">
            <div className="home__friend__stories">
              <h2 onClick={() => console.log('Friends stories list') }  style={{ cursor: "pointer" }}>Friends Stories</h2>
              <div className="stories__items">
                <div className="friend__story__items">
                  <img
                    src="https://i.insider.com/5ab40aa2a5ac361d008b4780?width=700"
                    alt=""
                  />
                  <h5>@Captain</h5>
                </div>
                <div className="friend__story__items">
                  <img
                    src="https://m.media-amazon.com/images/I/61Bx7HZwXGL._AC_SL1300_.jpg"
                    alt=""
                  />
                  <h5>@Ironman_v4</h5>
                </div>
                <div className="friend__story__items">
                  <img
                    src="https://m.media-amazon.com/images/I/61Bx7HZwXGL._AC_SL1300_.jpg"
                    alt=""
                  />
                  <h5>@Ironman</h5>
                </div>
                <div className="friend__story__items">
                  <img
                    src="https://i.insider.com/5ab40aa2a5ac361d008b4780?width=700"
                    alt=""
                  />
                  <h5>@Captain</h5>
                </div>
                <div className="friend__story__items">
                  <img
                    src="https://i.insider.com/5ab40aa2a5ac361d008b4780?width=700"
                    alt=""
                  />
                  <h5>@Captain</h5>
                </div>
              </div>
            </div>
            <div className="home__contents_body">
              <h2 onClick={() => console.log('Following and follower users') }  style={{ cursor: "pointer" }}>Following Users</h2>
              <div className="follow__users">
                <ul>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://assets.vogue.com/photos/60eef8c728198051b1f04558/1:1/w_1475,h_1475,c_limit/tgd3260_101_comp_v007_35250b79%20(2).jpeg"
                          alt=""
                        />
                        <h4>@John_backey</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://i.redd.it/mh7s3m7igys21.jpg"
                          alt=""
                        />
                        <h4>@Loki_n97</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://img.freepik.com/free-vector/ship-captain-wheel-isolated-white-background_7496-1004.jpg?size=338&ext=jpg"
                          alt=""
                        />
                        <h4>@Benz_Orkard</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg"
                          alt=""
                        />
                        <h4>@Izbay_morbile</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://res.cloudinary.com/swizce/image/upload/v1620702350/Swizce/icons/test_roevfj.jpg"
                          alt=""
                        />
                        <h4>@Corbowl_mozzil</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="users__items">
                        <img
                          src="https://assets.vogue.com/photos/60eef8c728198051b1f04558/1:1/w_1475,h_1475,c_limit/tgd3260_101_comp_v007_35250b79%20(2).jpeg"
                          alt=""
                        />
                        <h4>@Corbowl_mozzil</h4>
                        <p>Active</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="home__content__footer">
              <div className="copy__right__component">
                <h5>
                  Term of Service, Privacy Policy,
                  <br /> Cookie Policy, Ads info more...
                </h5>
                <p></p>
                <p>&copy;{getYear()} | Swizce Inc,</p>
              </div>
            </div>
          </div>
        </section>
        <section className="home__main">
          {/* main container */}
          <div className="home__container">
            {data &&
              data.screams.map((scream) => (
                <Home scream={scream} key={scream.id} user={loggedInUser} />
              ))}
          </div>
        </section>
        <section className="home__right">
          <div className="home__markets__shared">
            <h2  onClick={() => console.log('Market place list item products') }  style={{ cursor: "pointer" }}>Market Places</h2>
            <hr />
            <div className="market__place__items">
              <div className="product__item">
                <img
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $1090</p>
                </div>
              </div>
              <div className="product__item">
                <img
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $899</p>
                </div>
              </div>
              <div className="product__item">
                <img
                  src="https://static-www.o2.co.uk/sites/default/files/iphone-13-blue-sku-header-141021.png"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $1099</p>
                </div>
              </div>
            </div>
            <div className="market__place__items">
              <div className="product__item">
                <img
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $989</p>
                </div>
              </div>
              <div className="product__item">
                <img
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $1199</p>
                </div>
              </div>
              <div className="product__item">
                <img
                  src="https://static-www.o2.co.uk/sites/default/files/iphone-13-blue-sku-header-141021.png"
                  alt=""
                />
                <div className="product__action">
                  <p>price: $790</p>
                </div>
              </div>
            </div>
          </div>
          <div className="users__room__activity">
            <h2 onClick={() => console.log('Trending and public room') }  style={{ cursor: "pointer" }}>Public Rooms</h2>
            <div className="users__room__item">
              <ul>
                <li>
                  <div className="room__item">
                    <img
                      src="https://www.coe.int/documents/16695/63022230/Online-education.jpg/ecd788db-d4c0-3688-bab2-630843f09f17?t=1594381553000"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>Dev-Ops Platform Optimize</p>
                    </div>
                    <a href="">Join</a>
                  </div>
                </li>
                <li>
                  <div className="room__item">
                    <img
                      src="https://blog.coursify.me/wp-content/uploads/2019/09/online-education-coursifyme.jpg"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>Arigculture Information study</p>
                    </div>
                    <a href="">Join</a>
                  </div>
                </li>
                <li>
                  <div className="room__item">
                    <img
                      src="https://www.coe.int/documents/16695/63022230/Online-education.jpg/ecd788db-d4c0-3688-bab2-630843f09f17?t=1594381553000"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>HR Training Ops</p>
                    </div>
                    <a href="">Join</a>
                  </div>
                </li>
                <li>
                  <div className="room__item">
                    <img
                      src="https://blog.coursify.me/wp-content/uploads/2019/09/online-education-coursifyme.jpg"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>Online Marketing share</p>
                    </div>
                    <a href="">Join</a>
                  </div>
                </li>
                <li>
                  <div className="room__item">
                    <img
                      src="https://www.coe.int/documents/16695/63022230/Online-education.jpg/ecd788db-d4c0-3688-bab2-630843f09f17?t=1594381553000"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>React Strategy base</p>
                    </div>
                    <a href="">Join</a>
                  </div>
                </li>
                <li>
                  <div className="room__item">
                    <img
                      src="https://blog.coursify.me/wp-content/uploads/2019/09/online-education-coursifyme.jpg"
                      alt=""
                    />
                    <div className="room__activity">
                      <p>Python ML Learning</p>
                    </div>
                    <a href="">Join</a>
                  </div>
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

export default Start;
