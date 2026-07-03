import { Navigate } from "react-router-dom";
// SEO: Duplicate-Content-Konsolidierung – Weiterleitung auf die kanonische /standorte/bremen Seite.
const FahrschuleBremen = () => <Navigate to="/standorte/bremen" replace />;
export default FahrschuleBremen;
