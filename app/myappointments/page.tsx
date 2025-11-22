import MainView from "@/components/MyAppointments/MainView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مواعيدي | إدارة حجوزاتك الطبية بسهولة",
  description: "تتبع مواعيدك الطبية القادمة والسابقة، وقم بإدارة حجوزاتك مع أفضل الأطباء والعيادات بكل سهولة وأمان.",
};

const MyAppointments = () => {
  return <MainView />;
};

export default MyAppointments;
