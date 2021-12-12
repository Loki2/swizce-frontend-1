import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { QUERY_SCREAMS } from "../../graphql/Scream";

import Screams from "../../components/Scream/Screams";
// import { Scream } from "../../types";
import Rightbar from "../../components/Partials/Rightbar";
import Sidebar from "../../components/Partials/Sidebar";
import Index from "../../components/Index";


interface Props {}

const ScreamPage: React.FC<Props> = () => {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
      return currentYear;
  };

  const { loggedInUser } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_SCREAMS, {
    fetchPolicy: "network-only",
  }); //<{ screams: Scream[], user: User }>

  // console.log("scream data:", data);


  
  const router = useRouter();

  useEffect(() => {
    //if user is not authenticated pusg to home page
    if (!loggedInUser) {
      // alert('Log in to processed...!')
      router.push("/");
    } else {
      router.push("/Screams");
    }
  }, [loggedInUser]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error</p>;

  return !loggedInUser ? (
    <Index />
  ) : (
    <>
      <Sidebar />
      <div className="scream__page">
        <section className="scream__left">
          <div className="scream__stream__contents">
            <div className="lives__steam__now">
              <h2>Streaming Now!</h2>
              <ul>
                <li>
                  <a>
                    <div className="scream__live__items">
                      <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <div className="scream__live__items">
                      <img src="https://bbts1.azureedge.net/images/p/full/2020/07/0f7de760-48a5-4b66-8fbe-307c83f5d2d0.jpg" alt="" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="scream__contents_body">
              <h2>Following Chanels</h2>
              <div className="user__follower__channels">
                <ul>
                  <li>
                    <a>
                      <div className="follower__channel__item">
                        <img src="https://www.ajournalofmusicalthings.com/wp-content/uploads/minions_2015-wide.jpg" alt="" />
                        <h4>@CNN Global</h4>
                        <p>Live</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className="follower__channel__item">
                        <img src="https://charlieintel.com/wp-content/uploads/2021/01/53f7d969762523414600a6549e36202a.jpg" alt="" />
                        <h4>@Pubg-White Hat</h4>
                        <p>Live</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className="follower__channel__item">
                        <img src="https://abg-static.s3.amazonaws.com/media/mobile-legends-thumbnail-2.jpg" alt="" />
                        <h4>@GoTiny-Incomnia</h4>
                        <p>Live</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className="follower__channel__item">
                        <img src="https://ar.toneden.io/52059278/9d1619c5-c469-4c8f-a959-abd909b7e692" alt="" />
                        <h4>@White Black-GO</h4>
                        <p>Live</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className="follower__channel__item">
                        <img src="https://www.ajournalofmusicalthings.com/wp-content/uploads/minions_2015-wide.jpg" alt="" />
                        <h4>@CNN Global</h4>
                        <p>Live</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="home__content__footer">
              <div className="copy__right__component">
                <h5>Term of Service, Privacy Policy,<br /> Cookie Policy, Ads info more...</h5>
                <p>&copy;{getYear()} {" "}| Swizce Inc,</p>
              </div>
            </div>
          </div>
        </section>

        <section className="scream__main">
          {/* main container */}
          <div className="scream__contain">
            {data &&
              data.screams.map((scream) => (
                <Screams scream={scream} key={scream.id} user={loggedInUser} />
              ))}
          </div>
        </section>

        <section className="scream__right">
          <div className="scream__markets__shares">
            <h2>Market Places</h2>
            <hr />
            <div className="scream__market__place">
              <div className="scream__product__item">
                <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000" alt="" />
                  <div className="scream__product__action">
                    <p>price: $1090</p>
                  </div>
              </div>
              <div className="scream__product__item">
                <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000" alt="" />
                <div className="scream__product__action">
                  <p>price: $899</p>
                </div>
              </div>
              <div className="scream__product__item">
                <img src="https://static-www.o2.co.uk/sites/default/files/iphone-13-blue-sku-header-141021.png" alt="" />
                <div className="scream__product__action">
                  <p>price: $1099</p>
                </div>
              </div>          
            </div>
            <div className="scream__market__place">
              <div className="scream__product__item">
                <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000" alt="" />
                  <div className="scream__product__action">
                    <p>price: $989</p>
                  </div>
              </div>
              <div className="scream__product__item">
                <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000" alt="" />
                <div className="scream__product__action">
                  <p>price: $1199</p>
                </div>
              </div>
              <div className="scream__product__item">
                <img src="https://static-www.o2.co.uk/sites/default/files/iphone-13-blue-sku-header-141021.png" alt="" />
                <div className="scream__product__action">
                  <p>price: $790</p>
                </div>
              </div>          
            </div>
          </div>
          <div className="scream__shope__activity">
            <h2>More Shops!</h2>
            <div className="scream__shope__list">
              <ul>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://previews.123rf.com/images/fiphoto/fiphoto1405/fiphoto140503452/28597875-luxury-and-fashionable-brand-new-interior-of-cloth-store.jpg" alt="" />
                        <div className="scream__shope__action">
                          <p>Cloth Shops</p>
                          <a href="">Shop Now!</a>
                        </div>
                      </div>
                  </li>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://retaildesignblog.net/wp-content/uploads/2013/01/Club-Monaco-Mens-Shop-Toronto.jpg" alt="" />
                        <div className="scream__shope__action">
                          <p>Mens Shops</p>
                          <a href="">Shop Now!</a>
                        </div>
                      </div>
                  </li>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://cdn.images.express.co.uk/img/dynamic/130/590x/women-shopping-825605.jpg" alt="" />
                        <div className="scream__shope__action">
                          <p>Womens Shop</p>
                          <a href="">Shop Now!</a>
                        </div>
                      </div>
                  </li>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://cdn.trendhunterstatic.com/thumbs/electronic-store.jpeg" alt="" />
                        <div className="scream__shope__action">
                          <p>Electronics Shop</p>
                          <a href="">Shop Now!</a>
                        </div>
                      </div>
                  </li>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://fridayflyer.com/wp-content/uploads/2015/02/A5-PIC-3-P1010050.jpg" alt="" />
                        <div className="scream__shope__action">
                          <p>Kids Shop</p>
                          <a href="">Shop Now!</a>
                        </div>
                      </div>
                  </li>
                  <li>
                      <div className="scream__shope__item">
                        <img src="https://fridayflyer.com/wp-content/uploads/2015/02/A5-PIC-3-P1010050.jpg" alt="" />
                        <div className="scream__shope__action">
                          <p>Kids Shop</p>
                          <a href="">Shop Now!</a>
                        </div>
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

export default ScreamPage;
