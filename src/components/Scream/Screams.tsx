import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from 'moment';

import { Scream, User } from "../../types";


interface Props {
  scream: Scream;
  user: User
}


const Screams: React.FC<Props> = ({ scream, user }) => {
  dayjs.extend(relativeTime);
  return (
    <>
      <div className="scream">
        <div className="scream__container">
          {/* design scream images template */}
          <div className="scream__media" onClick={() => console.log(`View Scream by ID: ${scream.id}`)}>
            <img src={scream.imageUrl} alt=""/>
          </div>

          {/* user profile for who scream */}
          <div className="scream__user__profile" onClick={() => console.log(`View user profile by ID: ${scream.user.id}`)}>
            {
              !scream.user.images ?
              <img src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png" alt="" />
              :
              <img src={scream.user.images} alt="" />
            }
          </div>
          {/* More functionality */}
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
          
          <div className="scream__user__info">
            <h3 onClick={() => console.log(`View user profile by ID: ${scream.user.id}`)}>
              @{scream.user.username}{" "}
            </h3>
            <h4>
              public: {moment(scream.createdAt, "YYYYMMDD").fromNow()}
            </h4>
          </div>
          <hr />
          {/* Scream Contents */}
          <div className="scream__content">
            <p>{scream.description}</p>
          </div>

          {/* Scream functionality */}
          <div className="play__scream" onClick={() => console.log(`View Single scream by ID:${scream.id}`)}>
            <i className="ti-control-play"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screams;