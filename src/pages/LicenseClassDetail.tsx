import { useParams, Navigate } from "react-router-dom";
import LicenseClassPage from "@/components/LicenseClassTemplate";
import { getClassBySlug } from "@/data/licenseClassData";

const LicenseClassDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getClassBySlug(slug) : undefined;

  if (!data) return <Navigate to="/fuehrerscheinklassen" replace />;

  return <LicenseClassPage data={data} />;
};

export default LicenseClassDetail;
