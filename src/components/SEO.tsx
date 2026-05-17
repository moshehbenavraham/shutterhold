import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: object;
  /**
   * When true, emits `robots: noindex, nofollow` and `googlebot: noindex, nofollow`
   * so search engines do not index the page. Used by 404 / "unknown slug" pages
   * to keep junk URLs out of the index.
   */
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage = "/og-image.jpg",
  twitterCard = "summary_large_image",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const siteUrl = "https://morganblake.com";
  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Morgan Blake Photography" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      <meta name="author" content="Morgan Blake" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
