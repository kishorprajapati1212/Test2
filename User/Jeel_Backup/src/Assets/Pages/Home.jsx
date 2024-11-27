import React from 'react';
import Firstcontainer from '../Component/Home_Page/Firstcontainer';
import Secondcontainer from '../Component/Home_Page/Secondcontainer';
import Responsivegallry from '../UI-Test/Responsivegallry';

const Home = () => {
  const Heightsize = "80vh";

  const Header1 = "Image Generation";
  const Header1_Summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit...";
  const Header1_url = "/Image_generation";
  const Header1_Button_text = "Image Generation";

  const Header2 = "Video Generation";
  const Header2_Summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit...";
  const Header2_url = "/Video_generation";
  const Header2_Button_text = "Video Generation";

  const Header3 = "Sky Generation";
  const Header3_Summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit...";
  const Header3_url = "/Skybox_generation";
  const Header3_Button_text = "SkyBox Generation";

  return (
    <div>
      <Firstcontainer Heightsize={Heightsize} />
      <Secondcontainer Header={Header1} Header_summary={Header1_Summary} Header_url={Header1_url} Direaction={false} Header_Button_text={Header1_Button_text} />
      <Secondcontainer Header={Header2} Header_summary={Header2_Summary} Header_url={Header2_url} Direaction={true} Header_Button_text={Header2_Button_text} />
      <Secondcontainer Header={Header3} Header_summary={Header3_Summary} Header_url={Header3_url} Direaction={false} Header_Button_text={Header3_Button_text} />
      <Responsivegallry />
    </div>
  );
};

export default Home;
