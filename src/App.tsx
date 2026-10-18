import { useI18n } from "./i18n/I18n";
import { useLocation } from "@tanstack/react-router";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import { Outlet } from "@tanstack/react-router";

function App() {
  const { t } = useI18n(["common"]);
  const location = useLocation();

  const isLoginOrSignUpPage =
    location.pathname === "/Login" || location.pathname === "/Signup";

  return (
    <>
      {!isLoginOrSignUpPage && <Header />}

      <Outlet />

      {!isLoginOrSignUpPage && (
        <>
          <p className="currency-note">
            {t("common:currency.estimateNotice")}
          </p>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
