import React from 'react';
import { QUERY_MYPROFILE } from "../../graphql/User";
import { useQuery } from "@apollo/client";
import { VscAccount, VscMail, VscHeart } from 'react-icons/vsc';
import { MdPhone, MdQuestionAnswer, MdHelpOutline } from "react-icons/md";
import { User } from '../../types';

interface Props {
  user: User
}

const Rightbar: React.FC<Props> = ({ user }) => {
  // console.log("my profile:", profile)
  const { data, loading, error } = useQuery(QUERY_MYPROFILE, {
    fetchPolicy: "network-only",
  });


  if(loading) return <p>Loading....!</p>
  if(error) return <p>Ooooops....!</p>

  const myprofile = data.myprofile;

  // console.log("my profle information:", myprofile)

  return ! myprofile ? (
    <section className="rightbar">
    {/* Right bar */}
      <div className="rightbar Profile">
        <div className="profile">
          <a>
            <img src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png"  />
          </a>            
        </div>
        <div className="biography">
          <p>Add Profile</p>
        </div>
        <div className="profile-action">
          <a href="/">
            <VscAccount size={32} color="teal" />
          </a>
          <a href="/">
            <VscMail size={32} color="teal" />
          </a>
          <a href="/">
            <VscHeart size={32} color="teal" />
          </a>
        </div>
        <div className="footer-action">
          <a href="#">
            <MdPhone size={44} color="teal"/>
          </a><br />
          <a href="#">
            <MdQuestionAnswer size={44} color="teal"/>
          </a><br /><br />
                    
          <a href="#">
            <MdHelpOutline size={44} color="teal"/>
          </a>
        </div>
      </div>      
    </section>
    )
    :(
    // if user does not have profile    
    <section className="rightbar">
      {/* Right bar */}
        <div className="rightbar Profile">
        {/* <div className="coverImage">
          <img src={loggedInUser.profile.coverUrl} width="400px" height="168px" />
        </div> */}
        <div className="profile">
          <a onClick={() => console.log("Create User Stories")} >
            <img src={user.images}  />
          </a>            
        </div>
        <div className="biography">
          <p>{myprofile.firstname} {myprofile.lastname}</p>
          {/* <p>the world is not for some one only</p> */}
        </div>
        <div className="profile-action">
          <a href="/">
            <VscAccount size={28} color="teal" />
          </a>
          <a href="/">
            <VscMail size={28} color="teal" />
          </a>
          <a href="/">
            <VscHeart size={28} color="teal" />
          </a>
        </div>
        <div className="footer-action">
          <a href="#">
            <MdPhone size={38} color="teal"/>
          </a><br />
          <a href="/Messagers">
            <MdQuestionAnswer size={38} color="teal"/>
          </a><br /><br />            
          <a href="#">
            <MdHelpOutline size={38} color="teal"/>
          </a>
        </div>
      </div>
    </section>
    )
}

export default Rightbar;
