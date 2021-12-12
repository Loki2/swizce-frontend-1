import React from "react";

interface Props {}

const Messager: React.FC<Props> = () => {
  return (
      <div className="messager__content">
        <section className="messager__main__left">
          <div className="container">
            <h4>Chats</h4>
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
  );
};

export default Messager;
