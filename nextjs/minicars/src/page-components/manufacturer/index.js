import React from 'react';

import { H1, Header, Outer } from 'ui';
import ParagraphCollection from 'components/shape/components/paragraph-collection';
import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import items from 'components/items';
import { useT } from 'lib/i18n';

import query from './query';
import { HeroImage, Img, List, H2, Related } from './styles';

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });
  return { ...data, preview };
}

export default function ManufacturerPage({ manufacturer, preview }) {
  const t = useT();
  const name = manufacturer.name.content.text;
  const images = manufacturer.images.content.images;
  const brief = manufacturer.brief.content.paragraphs;
  const relatedProducts = null;

  console.log(brief);

  return (
    <Layout title={name || manufacturer.name} preview={preview}>
      <Outer>
        <Header centerContent>
          <H1>{name}</H1>
        </Header>

        <HeroImage>
          {images?.map((img, i) => (
            <Img
              key={img.url}
              {...img}
              alt={img.altText}
              sizes={i > 0 ? '40vw' : '80vw'}
            />
          ))}
        </HeroImage>

        <ParagraphCollection paragraphs={brief} />
      </Outer>
      {relatedProducts?.content?.items?.length && (
        <Related>
          <H2>
            {t('product.relatedProduct', {
              count: relatedProducts.content.items.length
            })}
          </H2>
          <List>
            {relatedProducts.content.items.map((item) => items(item))}
          </List>
        </Related>
      )}
    </Layout>
  );
}
