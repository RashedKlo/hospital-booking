import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "حجز موعد | مستشفى النور الطبي",
  description:
    "احجز موعدك مع أفضل الأطباء والمتخصصين. نوفر رعاية صحية متميزة في جميع التخصصات الطبية",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="حجز موعد طبي"
        description="احجز موعدك الآن مع أفضل الأطباء المتخصصين. نوفر لك رعاية صحية متميزة في جميع الأقسام الطبية. املأ النموذج وسنتواصل معك للتأكيد."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
