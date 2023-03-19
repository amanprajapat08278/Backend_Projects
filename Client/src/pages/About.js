import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import "../CSS/about.css"
import Navbar from "../Componenets/Navbar";

function About() {
  const [state] = useState({
    title: "Hello everyone",
    titleTwo: "Contact me for"
  });

  return (


    <>
      <Navbar />


      <div className="home">

        <div className="home-intro" id="content-div">
          <h2>
            <div className="title">{state.title}</div>
          </h2>
          <h2>
            <div className="titleTwo ">{state.titleTwo}</div>
          </h2>

          <div className="text">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  "Web App Development",
                  "UX/UI Design",
                  "Full-stack Development",
                  "Your DREAM project"
                ],
              }}
            />
          </div>
        </div>

        <div className="pic-part">
          <div>
            <img src="aman.png" alt="" className="pro-img" />
            <h3 className="tex deep">Aman Prajapat</h3>

          </div>
         

        </div>
        <div className="icons" style={{color:"red"}}>
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent?compose=GTvVlcSBmlxrdltbdcsgPXTFglmhWDMwSjzMjsfNvhLpCmNgMBbLFzxgCwzDKxffvdPRvlrLLLvbW"><i class="fa-regular fa-envelope"></i></a>
            <a href="https://www.linkedin.com/in/aman-prajapat-249a53225"><i className="fa-brands fa-linkedin-in ic-chnage" /></a>
            <a href="https://instagram.com/amanprajapat08278?igshid=ZDdkNTZiNTM="><i className="fa-brands fa-instagram  ic-chnage" /></a>
            <a href="https://chat.whatsapp.com/JIZN0tnffpKCFBMfQ2QScU"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
      </div>
    </>
  );
}

export default About;
