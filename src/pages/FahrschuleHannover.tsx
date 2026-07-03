import { Navigate } from "react-router-dom";
// SEO: Duplicate-Content-Konsolidierung – wir führen alle Signale auf die kanonische /standorte/hannover Seite.
const FahrschuleHannover = () => <Navigate to="/standorte/hannover" replace />;
export default FahrschuleHannover;
