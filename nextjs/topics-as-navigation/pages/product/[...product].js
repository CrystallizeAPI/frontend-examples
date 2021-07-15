import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image } from "@crystallize/react-image";

import { useTenant } from "../../components/tenant-context";
import styles from "../../styles/Product.module.css";

export default function Product() {
  const { query } = useRouter();
  const tenant = useTenant();
  const [product, setProduct] = useState(null);

  const productPath = "/" + (query.product || []).join("/");

  /**
   * Fetch the product from Crystallize
   */
  useEffect(() => {
    (async function getProduct() {
      const response = await tenant.fetchFrom.catalogue({
        query: `
          query GET_PRODUCT ($productPath: String!, $language: String!) {
            catalogue(path: $productPath, language: $language) {
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
        `,
        variables: {
          productPath,
          language: tenant.language,
        },
      });
      setProduct(response.data.catalogue);
    })();
  }, [tenant, productPath]);

  if (!product) {
    return <main className={styles.main}>...</main>;
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Details of ${product.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{product.name}</h1>
        <ul className={styles.topics}>
          {product.topics?.map((t) => (
            <li key={t.path}>
              <Link href={t.path}>
                <a>{t.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...product.defaultVariant?.firstImage} sizes="500px" />
      </main>
    </>
  );
}
