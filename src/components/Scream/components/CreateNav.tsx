import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_MYPROFILE } from '../../../graphql/User';
import { User } from '../../../types';


interface Props {
  user: User
}

const CreateNav: React.FC<Props> = ({ user }) => {
  const { data, loading, error } = useQuery(QUERY_MYPROFILE, {
    fetchPolicy: "network-only",
  });

  if(loading) return <p>Loading....!</p>
  if(error) return <p>Ooooops....!</p>

  console.log("user from create scream", user)

  const myprofile = data.myprofile;

  return !myprofile ?  (
    <div className="create__nav">
      <div className="__profile">
        <img src="http://www.thejungleadventure.com/assets/images/noimage/noimage.png" alt="" />
      </div>
        <span>@{user.username}</span>       
      <div className="scream__status">
        status:
      </div>
      <div className="tags__list">
        <span>@feeling, activity, question...? (Category Tags)</span>
      </div>
    </div>
  ):(
    <div className="create__nav">
      <div className="__profile">
        <img src={myprofile.profileUrl} alt="" />
      </div>
        <span>@{myprofile.firstname}</span>       
      <div className="scream__status">
            status:
      </div>
      <div className="tags__list">
        <span>@feeling, activity, question...? (Category Tags)</span>
      </div>
    </div>
  )  
}

export default CreateNav
