import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName=" من نحن"
        description="نحن فريق متخصص نسعى لتقديم أفضل الحلول التقنية والخدمات المبتكرة. نؤمن بالجودة والتميز في كل ما نقدمه لعملائنا."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
