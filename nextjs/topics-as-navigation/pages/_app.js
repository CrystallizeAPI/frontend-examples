import "../styles/globals.css";

import { TenantProvider } from "../components/tenant-context";
import { Header, Footer } from "../components/main-nav";

function MyApp({ Component, pageProps }) {
  /**
   * Only client side navigation for this example
   * as we allow for switching of tenants.
   */
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <TenantProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </TenantProvider>
  );
}

export default MyApp;
