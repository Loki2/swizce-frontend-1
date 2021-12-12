import React, { useContext } from 'react';
// import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
// import Link from 'next/link';



interface Props {
  
}

const Index: React.FC<Props> = () => {
  const { handleAuthAction } = useContext(AuthContext);

  // const router = useRouter();


  // const pconcept =
  // router.locale === "en-US"
  //   ? "Just do one more thing...!, Forward to your goal:)"
  //   : router.locale === "la"
  //   ? "ຂໍພຽງລົງມືເຮັດ...!, ອິກໜື່ງບາດກ່າວສູ່ຄວາມສຳເລັດ:)"
  //   : router.locale === "fr"
  //   ? "Fais juste une chose de plus...!, En avant vers votre objectif:)"
  //   : router.locale === "th" 
  //   ? "แค่ทำอีกสิ่งหนึ่ง...!, มุ่งสู่เป้าหมายของคุณ:)"
  //   : "";


  return (
    <div className="home__page">
      <section className="home__main">
        {/* main container */}
        <div className="swizce__home__container">
          <div className="swizce__contents">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1633952299/Swizce/home/Collaborators_mgnxhg.svg"
              alt=""
            />
          </div>
          <div className="swizce__slogan">
            <img
              src="https://res.cloudinary.com/swizce/image/upload/v1620702365/Swizce/icons/swizce_aez2ms.png"
              height="34px"
            />
            {/* <p>{pconcept}</p> */}
            <br />
            <hr />
            <div className="swizce__slogan__action">
              <a
                onClick={() => handleAuthAction("signin")}
                style={{ cursor: "pointer" }}
              >
                Signin
                <i className="ti-angle-right" />
              </a>
            </div>
          </div>
        </div>
        <div className="select__languege">
          <ul>
            {/* {
              router.locales.map(locale => <li key={locale}>
                <Link href={router.asPath} locale={locale}>{locale}</Link>
              </li>)
            } */}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Index
