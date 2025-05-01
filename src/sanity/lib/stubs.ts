import { defineQuery, groq } from "next-sanity";

export const seoStub = groq`
seo {
  title,
  description,
  ogImage,
  keywords,
}
`;

export const imageStub = groq`
_type,
alt,
asset->{
  _id,
  metadata {
    lqip
  }
}
`;

export const formattedTextStub = groq`
...,
markDefs[]{
  ...
}
`;

export const linkStub = groq`
_key,
_type,
appendLink,
jumpLink,
color != null => { color },
newTab != null => { newTab },
title != null => { title },
category != null => { category },
link != null => { link },
page != null => {
  page-> {
    _type,
    _id,
    "slug": slug.current,
    "title": title
  }
}
`;

export const richTextStub = groq`
...,
_type == "image" => { ${imageStub} },
markDefs[]{
  ...,
  _type == "link" => {
    "slug": @.reference->slug.current,
    "link": {
      href != null => {
        "link": href
      },
      button,
      reference != null => {
        "page": reference->{
          _type,
          _id,
          "button": ^.button,
          "slug": slug.current,
          category != null => {
            "category": category->slug.current
          }
        }
      }
    }
  }
}
`;

export const blockOptionsStub = groq`
  ...,
`;

export const menuItemStub = groq``;

export const blocksStub = defineQuery(`
  blocks[] {
    ...,
    _type,
    "spotColor": ^.spotColor.hex,
    "themeColor": ^.themeColor,
    "caseStudies": @.projects[]->,
    cta != null => { cta { ${linkStub} } },
    link != null => { link { ${linkStub} } },
    richTextContent != null => richTextContent[] {
      ${richTextStub}
    },
    _type == "stackList" => {
      items[] {
        _key,
        title,
        richTextContent,
        image,
        link {
          ${linkStub}
        }
      }
    },
    // TODO: remove below completely when office data filled in in sanity
    _type == "officeList" => {
      officeList[] {
        _key,
        title,
        officeRef-> {
          _id,
          "slug": slug.current,
          city,
          region
        }
      }
    },
    _type == "newsArchive" => {
      title,
      "posts": *[_type == "newsPost"] | order(date desc) [0...10] {
        _id,
        ${seoStub},
        hero,
        "slug": slug.current,
        title,
        categories[]->,
        themeColor,
        "spotColor": spotColor.hex,
        previewImage,
        author->,
        content,
        date,
      }
    },
    _type == "realityCheckQuiz" => {
      ...,
      "quiz": *[_type == "quiz"][0]
    },
    _type == "videoHero" => {
      "video": {
        "selected": "video",
        "videoDesktop": video.videoDesktop.asset->url,
        "videoMobile": video.videoMobile.asset->url,
      }
    },
    _type == "scrollableCaseStudies" => {
      "caseStudies": caseStudies[]{
        sectionTitle,
        title,
        description,
        cta { ${linkStub} },
        assets[],
        bulletPoints[] {
          point[] {
            ${richTextStub}
          }
        }
      }
    },
    _type == "projectsList" => {
      _type,
      _key,
      projects[]-> {
        ...,
      }
    },
    _type == "jobList" => {
      ...,
      jobs[]->
    },
  }
`);

export const caseStudyBlockStub = `
...,
richTextContent != null => {
  richTextContent[] {
    ${richTextStub}
  },
},
image1 != null => {
  image1 {
    ${imageStub}
  },
},
image2 != null => {
  image2 {
    ${imageStub}
  },
},
image3 != null => {
  image3 {
    ${imageStub}
  },
},

`;
