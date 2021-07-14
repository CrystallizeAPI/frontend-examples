import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useTenant } from "../tenant-context";
import styles from "../../styles/MainNav.module.css";

function ChangeTenant() {
  const input = useRef();
  const tenant = useTenant();
  const [t, sT] = useState(tenant.identifier);
  const [show, setShow] = useState(false);

  function onKeyPress(e) {
    if (e.code === "Enter") {
      tenant.setIdentifier(e.target.value);
      setShow(false);
    }
  }

  useEffect(() => {
    sT(tenant.identifier);
  }, [tenant.identifier]);

  useEffect(() => {
    if (show) {
      input.current?.select();
    }
  }, [show]);

  return (
    <div className={styles.changeTenant}>
      <div>
        <label htmlFor="change-tenant">Tenant</label>
        <input
          id="change-tenant"
          type="text"
          value={t}
          ref={input}
          readOnly={!show}
          onKeyPress={onKeyPress}
          onChange={(e) => sT(e.target.value)}
        />
      </div>
      {!show && (
        <button id="change-tenant" onClick={() => setShow(true)}>
          Change
        </button>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ChangeTenant />
      <div className={styles.footerInner}>
        <a
          href="https://crystallize.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/crystallize.svg"
              alt="Crystallize Logo"
              width={75 * 1.5}
              height={25 * 1.5}
            />
          </span>
        </a>
      </div>
    </footer>
  );
}
