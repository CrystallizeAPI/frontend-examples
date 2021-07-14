import React from "react";

import { createFetchers } from "./fetch-from-crystallize";

const defaultTenant = "furniture";
const TenantContext = React.createContext({
  identifier: defaultTenant,
  setIdentifier: () => {},
  fetchFrom: createFetchers(defaultTenant),
});

export const useTenant = () => React.useContext(TenantContext);

export function TenantProvider({ children }) {
  const [identifier, setIdentifier] = React.useState(defaultTenant);

  const fetchFrom = createFetchers(identifier);

  return (
    <TenantContext.Provider value={{ identifier, setIdentifier, fetchFrom }}>
      {children}
    </TenantContext.Provider>
  );
}
