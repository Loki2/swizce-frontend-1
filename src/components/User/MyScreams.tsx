import React from "react";
import { useRouter } from "next/router";
import { User, UserScream } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from 'moment';

interface Props {
  scream: UserScream,
  user: User
}

const MyScreams: React.FC<Props> = ({ scream, user }) => {
  dayjs.extend(relativeTime);
  const router = useRouter();
  return (
    <div className="user__scream__item">
      <div className="user__profile__scream">
        <div className="user__profile__scream__container">
          {/* design scream images template */}
          <div className="user__profile__scream__media">
            <img src={scream.imageUrl} alt="" />
          </div>

          {/* More functionality */}
          <ul className="side__icons">
            <span>
              <i className="ti-heart" />
            </span>
            <span>
              <i className="ti-comment" />
            </span>
            <span>
              <i className="ti-rss-alt" />
            </span>
          </ul>

          {/* Scream Contents */}
          <div className="user__profile__scream__content">
            <h2 onClick={() => router.push(`/user/${user.id}`)}>
              @<strong>{user.username}</strong>{" "}
            </h2>
            <span className="public_time">
              public: {moment(scream.createdAt).format("MMM Do YY")}
              </span>
            <p>{scream.description}</p>
          </div>

          {/* Scream functionality */}
          <div className="user__profile__play__scream">
            <i
              className="ti-control-play"
              onClick={() => router.push(`/Screams/v/_id=?$`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScreams;
