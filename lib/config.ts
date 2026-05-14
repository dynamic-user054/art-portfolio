
export const getConfig = () => ({
  name: process.env.NEXT_PUBLIC_ARTIST_NAME || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  tagline: process.env.NEXT_PUBLIC_TAGLINE || "",
  copyright: process.env.NEXT_PUBLIC_COPYRIGHT || "",
  bio: process.env.NEXT_PUBLIC_BIO || "",
  bioExtended: process.env.NEXT_PUBLIC_BIO_EXTENDED || "",
  mediums: process.env.NEXT_PUBLIC_MEDIUMS || "",
});

export const config = getConfig();