import { defineQuery, groq } from "next-sanity";

import { blocksStub, linkStub, seoStub } from "./stubs";

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    _type,
    ${seoStub},
    ${blocksStub},
    overview,
    title,
    hero{
      background,
      title
    },
    headline,
    intro,
    themeColor,
    navTheme
  }
`;

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    ${seoStub},
    ${blocksStub},
    body,
    overview,
    title,
    "slug": slug.current,
    themeColor,
    navTheme
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    ${seoStub},
    ${blocksStub},
    hero,
    client,
    site,
    "slug": slug.current,
    tags[]->,
    title,
    category->,
    related[]-> {
      ...,
      "slug": slug.current,
    },
    themeColor,
    navTheme,
    preview
  }
`);

export const newsBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    ${seoStub},
    hero,
    "slug": slug.current,
    title,
    categories[]->,
    themeColor,
    navTheme,
    "spotColor": spotColor.hex,
    excerpt,
    author->,
    content,
    date,
    related[]-> {
      ...,
      author->,
      categories[]->,
      "slug": slug.current,
    }
  }
`;
export const officeBySlugQuery = groq`
  *[_type == "office" && slug.current == $slug][0] {
    _id,
    ${seoStub},
    ${blocksStub},
    "slug": slug.current,
    city,
    region,
    themeColor,
    navTheme,
    contacts[]{
      _key,
      title,
      email,
    },
    address
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    logo != null => { logo },
    menuItems[]{
      ...,
      title,
      submenu[]{
        _key,
        title,
        bgType,
        image,
        video,
        link { ${linkStub} }
      }
    },
    ogImage,
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0]{
    address {
      title,
      content
    },
    contacts[] {
      _key,
      title,
      email,
    },
    copyrightText,
    navigation[]{
      _key,
      title,
      links[]{
        ${linkStub}
      }
    },
    lowerLinks[]{
      ${linkStub}
    },
    socialLinks[]{
      _key,
      socialType,
      handle,
    },
    cta {
      title,
      cta { ${linkStub} }
    },
  }
`;
