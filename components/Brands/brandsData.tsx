import { getImagePath } from "@/lib/utils";
import { Brand } from "@/types/brand";

const getBrandsData = (): Brand[] => [
  {
    id: 1,
    name: "وزارة الصحة",
    href: "#",
    image: getImagePath("/images/brands/uideck.svg"),
    imageLight: getImagePath("/images/brands/uideck-light.svg"),
  },
  {
    id: 2,
    name: "التأمين الصحي",
    href: "#",
    image: getImagePath("/images/brands/tailgrids.svg"),
    imageLight: getImagePath("/images/brands/tailgrids-light.svg"),
  },
  {
    id: 3,
    name: "الهلال الأحمر",
    href: "#",
    image: getImagePath("/images/brands/lineicons.svg"),
    imageLight: getImagePath("/images/brands/lineicons-light.svg"),
  },
  {
    id: 4,
    name: "الصحة العالمية",
    href: "#",
    image: getImagePath("/images/brands/ayroui.svg"),
    imageLight: getImagePath("/images/brands/ayroui-light.svg"),
  },
  {
    id: 5,
    name: "جمعية الأطباء",
    href: "#",
    image: getImagePath("/images/brands/plainadmin.svg"),
    imageLight: getImagePath("/images/brands/plainadmin-light.svg"),
  },
];

export default getBrandsData;
