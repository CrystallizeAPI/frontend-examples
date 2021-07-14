import { useEffect, useState } from "react";
import Link from "next/link";

import { useTenant } from "../tenant-context";
import styles from "../../styles/MainNav.module.css";

export function Header() {
  const tenant = useTenant();
  const [topics, setTopics] = useState(false);

  /**
   * Fetch the root topics from Crystallize
   */
  useEffect(() => {
    (async function getTopics() {
      const response = await tenant.fetchFrom.catalogue({
        query: `
          {
            topics {
              name
              path
            }
          }
        `,
      });
      setTopics(response.data.topics || []);
    })();
  }, [tenant]);

  return (
    <div className={styles.header}>
      {!topics
        ? "Getting topics for navigation..."
        : topics.map((topic) => (
            <Link href={topic.path} key={topic.path}>
              <a>{topic.name}</a>
            </Link>
          ))}
    </div>
  );
}
