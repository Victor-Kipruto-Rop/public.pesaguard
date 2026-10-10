/** Site-wide SEO defaults. */
export const seoConfig = {
  locale: "en_KE",
  type: "website" as const,
  // No social-share image is currently shipped; avoid advertising a large-image card without one.
  twitterCard: "summary" as const,
};
