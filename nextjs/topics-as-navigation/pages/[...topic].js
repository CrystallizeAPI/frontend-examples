import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "@crystallize/react-image";

import { useTenant } from "../components/tenant-context";
import styles from "../styles/Topic.module.css";

function handleBreadcrumbItem(arr, crumb) {
  if (crumb) {
    arr.splice(0, 0, crumb);
    handleBreadcrumbItem(arr, crumb.parent);
  }
}

export default function Topic() {
  const { query } = useRouter();
  const tenant = useTenant();
  const [topic, setTopic] = useState(null);

  const topicPath = "/" + (query.topic || []).join("/");

  /**
   * Fetch the topic from Crystallize
   */
  useEffect(() => {
    (async function getTopics() {
      const response = await tenant.fetchFrom.catalogue({
        query: `
          query GET_TOPIC ($topicPath: String!, $language: String!) {
            topic(path: $topicPath, language: $language) {
              name
              path

              nextLevel: children {
                name
                path
              }

              breadcrumbs: parent {
                name
                path
                parent {
                  name
                  path
                  parent {
                    name
                    path
                    parent {
                      name
                      path
                    }
                  }
                }
              }

              items (first: 6) {
                edges {
                  node {
                    ... on Product {
                      path
                      name
                      topics {
                        path
                        name
                      }
                      defaultVariant {
                        firstImage {
                          altText
                          url
                          variants {
                            url
                            width
                            height
                            size
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          topicPath,
          language: tenant.language,
        },
      });
      setTopic(response.data.topic);
    })();
  }, [tenant, topicPath]);

  if (!topic) {
    return null;
  }

  const breadcrumbs = [
    {
      name: topic.name,
      path: topic.path,
    },
  ];
  handleBreadcrumbItem(breadcrumbs, topic.breadcrumbs);

  const products =
    topic.items?.edges
      ?.filter((e) => e.node.defaultVariant)
      .map((e) => e.node) || [];

  return (
    <>
      <Head>
        <title>{topic.name}</title>
        <meta name="description" content={`Details of ${topic.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{topic.name}</h1>
        {breadcrumbs.length > 1 && (
          <ul className={styles.breadcrumbs}>
            {breadcrumbs.map((l) => (
              <li key={l.path}>
                <Link href={l.path}>{l.name}</Link>
              </li>
            ))}
          </ul>
        )}

        {topic.nextLevel && (
          <ul className={styles.nextLevel}>
            {topic.nextLevel.map((l) => (
              <li key={l.path}>
                <Link href={l.path}>{l.name}</Link>
              </li>
            ))}
          </ul>
        )}

        {products.length > 0 && (
          <ul className={styles.items}>
            {products.map((prod) => (
              <li key={prod.path}>
                <div className={styles.itemImageWrap}>
                  <Image {...prod.defaultVariant.firstImage} sizes="600px" />
                  <div className={styles.itemTopics}>
                    {prod.topics?.map((t) => (
                      <Link href={t.path} key={t.path}>
                        <a>{t.name}</a>
                      </Link>
                    ))}
                  </div>
                </div>
                <h3>{prod.name}</h3>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
