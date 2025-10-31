import Breadcrumb from "@/components/Common/Breadcrumb";
import AppointmentsList from "@/components/MyAppointments/AppointmentsList";
import AppointmentStats from "@/components/MyAppointments/AppointmentStats";

const MyAppointments = () => {
  return (
    <>
      <Breadcrumb
        pageName="مواعيدي"
        description="عرض وإدارة جميع مواعيدك الطبية. يمكنك تعديل أو إلغاء المواعيد القادمة ومراجعة سجل المواعيد السابقة."
      />

      <section className="pb-[120px] pt-[120px]" dir="rtl">
        <div className="container">
          <AppointmentStats />
          <AppointmentsList />
        </div>
      </section>
    </>
  );
};

export default MyAppointments;
