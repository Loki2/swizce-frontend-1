import React from "react";
import { Scream, User } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface Props {
  scream: Scream,
  user: User
}

const Home: React.FC<Props> = ({ scream, user }) => {
  dayjs.extend(relativeTime);
  return (
    <>
      <div className="home__scream">
        <div className="home__scream__container">

          <div className="home__scream__media" onClick={() => console.log(`View user profile by ID: ${scream.user.id}`)}>
            <img src={scream.imageUrl} />
          </div>
          

          {/* user profile for who scream */}
          <div className="home__user__profile" onClick={() => console.log(`View user profile by ID: ${scream.user.id}`)}>
            {
              !scream.user.images ? 
              <img src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png" alt="" />
              :
              <img src={scream.user.images} alt="" />
            }
              
          </div>

          <div className="__scream__content">
            <h2 onClick={() => console.log(`View user profile by ID: ${scream.user.id}`)}>
              @<strong>{scream.user.username}</strong>
            </h2>
            <span className="public_time">{dayjs(scream.createdAt).fromNow()}</span>
            <p>
             {scream.description}
            </p>
          </div>
          <div className="play__scream" onClick={() => console.log(`View Single scream by ID:${scream.id}`)}>
            <i className="ti-control-play" />
          </div>
          {
            user && user.id === scream.user.id ? (
              <ul className="side__icons">
                <span>
                  <i className="ti-settings" onClick={() => console.log(`Update Scream by ID: ${scream.id}`)} />
                </span><br />
                <span>
                  <i className="ti-heart" onClick={() => console.log(`Like Scream by ID: ${scream.id}`)} />
                </span>
                <span>
                  <i className="ti-comment" onClick={() => console.log(`Comment Scream by ID: ${scream.id}`)} />
                </span>
                <span>
                  <i className="ti-rss-alt" onClick={() => console.log(`Shared Scream by ID: ${scream.id}`)} />
                </span>
                <span>
                  <i className="ti-close" onClick={() => console.log(`Delete Scream by ID: ${scream.id}`)} />
                </span>
              </ul>
            ):(
              <ul className="side__icons">
                <span>
                  <i className="ti-heart" onClick={() => console.log(`Like Scream by ID: ${scream.id}`)} />
                </span>
                <span>
                  <i className="ti-comment" onClick={() => console.log(`Comment Scream by ID: ${scream.id}`)} />
                </span>
                <span>
                  <i className="ti-rss-alt" onClick={() => console.log(`Shared Scream by ID: ${scream.id}`)} />
                </span>
              </ul>
            )
          }
          
        </div>
      </div>
    </>
  );
};

export default Home;
