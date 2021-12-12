import React from 'react';
import Link from 'next/link';


interface Props {
  
}

const Notfound = (props: Props) => {
  return (
    <div className="home__page">
      <section className="home__main">
        {/* main container */}
        <div className="swizce__home__container">
          <div className="swizce__contents">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1638188997/Swizce/home/undraw_taken_re_yn20_teajpb.svg"
              alt=""
            />
          </div>
          <div className="swizce__slogan">
            <h1 style={{ color: "red", fontSize:"32px"}}>Ooooops...!</h1>
            <h4 style={{ color: "teal", fontSize: "14px"}}>That page not founds...!</h4>
            <br />
            <hr />
            <div className="swizce__slogan__action">
              <Link href="/">
                <a
                  style={{ cursor: "pointer" }}
                >
                  Go Back
                  <i className="ti-angle-right" />
                </a>
              </Link>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Notfound;
