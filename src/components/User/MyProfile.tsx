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

  if(loading) return <p>Loading....!</p>
  if(error) return <p>Ooooops....!</p>

  const myprofile = data.myprofile;

  return (
    <section>
      <div className="user__media__info">
        <div className="user__cover">
          {
            !user.covers ?
            <img src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png"  />
            :
            <img src={user.covers} alt="" />
          }          
        </div>
        <div className="user__profile">
          {
            !user.images ? 
            <img src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png"  />
            :
            <img src={user.images} alt="" />
          }          
        </div>
      </div>
      {
        !myprofile ?
        <div className="user__name">
          <h2>@{user.username}</h2>
        </div>
        :
        <div className="user__name__fullname">
          <h2>{myprofile.firstname} {" "} {myprofile.lastname}</h2>
        </div>
      }
    </section>
  );
};

export default Profile;
