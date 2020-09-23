export default `
  query MANUFACTURER_PAGE($language: String!, $path: String, $version: VersionLabel! ) {
    manufacturer: catalogue(language: $language, path: $path, version: $version) {
      name: component(id: "name") {
        id
        content {
          ... on SingleLineContent {
            text
          }
        }
      }
      images: component(id: "images") {
        id
        content {
          ... on ImageContent {
            images {
              url
            }
          }
        }
      }
      brief: component(id: "brief") {
        content {
          ... on ParagraphCollectionContent {
            paragraphs {
              title {
                text
              }
              body {
                json
              }
              images {
                url
              }
            }
          }
        }
      }
      relatingItems {
        id
        name
        path
        ... on Product {
          defaultVariant {
            images {
              url
              altText
              variants {
                url
                width
              }
            }
          }
        }
      }
    }
  }
`;
