import React from "react";
import { useRouter } from "next/router";
import { User } from "../../types";
import { QUERY_MYPROFILE } from "../../graphql/User";
import { useQuery } from "@apollo/client";

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  const { data, loading, error } = useQuery(QUERY_MYPROFILE, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading....!</p>;
  if (error) return <p>Ooooops....!</p>;

  const myprofile = data.myprofile;

  return (
    <section>
      <div className="user__information">
        {
          !user.covers ? (
            <img className="user__cover__image" src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png" alt="" />
          ):(
            <img className="user__cover__image" src={user.covers} alt="" />
          )
        }

        {
          !user.images ? (
            <img className="user__profile__image" src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png" alt="" />
          ):(
            <img className="user__profile__image" src={user.images} alt="" />
          )
        }
        <div className="user__name__fullname">
          {
            !myprofile ? (
              <h2 className="user__name">
                @{user.username}
              </h2>
            ) : (
              <h2>
                {myprofile.firstname} {myprofile.lastname}
              </h2>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Profile;
