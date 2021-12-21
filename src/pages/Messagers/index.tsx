import React, { useContext, useEffect } from 'react'
import Messager from '../../components/Messager/Messager';
import { useRouter } from 'next/router';

import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Partials/Sidebar';
import Rightbar from '../../components/Partials/Rightbar';
import Index from '../../components/Index';

interface Props {
  
}

const MessagerPage: React.FC<Props> = () => {
  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if(!loggedInUser){
      router.push('/');
    }else{
      router.push('/Messagers')
    }
  },[loggedInUser])
  return !loggedInUser ? (
      <Index />
      ):(
        <>
          <Sidebar />v
            <div className="messager__page">
              <div className="messager__content">
                <section className="messager__main__left">
                  <div className="container__top">
                    <h2>Chat Friend</h2>
                    <hr />
                    <div className="list__messenger__users">
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                    </div>
                  </div>

                  <div className="container__bottom">
                    <h4>Share with Friends</h4>
                    <hr />
                    <div className="list__messenger__users">
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                      <div className="list__messenger__user__item">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202010/2122/PjNOSo7CmIhP71f3MAF7SJPc.png?w=440" alt="" />
                        <span>Username</span>
                      </div>
                    </div>
                  </div>
                </section>

                
                <section className="messager__main">
                  <div className="container">
                    <h4>Messager</h4>
                  </div>
                </section>

                <section className="messager__main__right">
                  <div className="container">
                    <h4>Group, Rooms, Files</h4>
                  </div>
                </section>
            </div>
          </div>
        <Rightbar user={loggedInUser}/>
        </>
      )
}

export default MessagerPage;
