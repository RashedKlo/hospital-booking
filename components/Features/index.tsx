import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28" dir="rtl">
        <div className="container">
          <SectionTitle
            title="المميزات الرئيسية"
            paragraph="نظام حجز المواعيد الإلكتروني يوفر لك تجربة سلسة ومريحة للوصول إلى الخدمات الطبية. احجز موعدك بسهولة وسرعة من أي مكان وفي أي وقت."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
