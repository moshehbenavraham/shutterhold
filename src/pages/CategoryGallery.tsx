import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia, type GalleryItem } from "@/services/gallery";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all'];

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [page, setPage] = useState(1);

  const categoryLower = category?.toLowerCase() ?? "";
  const isValidCategory = validCategories.includes(categoryLower);
  const categoryUpper = isValidCategory ? categoryLower.toUpperCase() : "SELECTED";

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(categoryUpper, page, 20);
        setImages(data.items);
      } catch (err) {
        console.error("Error loading gallery media:", err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [categoryUpper, page]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'selected': 'Selected Works',
      'commissioned': 'Commissioned Projects',
      'editorial': 'Editorial Photography',
      'personal': 'Personal Projects',
      'all': 'All Photography'
    };
    return titles[cat] || 'Gallery';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Curated selection of luxury fashion campaigns and high-end editorial work showcasing contemporary minimalism and timeless elegance.',
      'commissioned': 'Commercial fashion campaigns for luxury brands, featuring product photography with clean aesthetics and professional execution.',
      'editorial': 'Editorial fashion photography for leading publications, combining artistic vision with commercial excellence.',
      'personal': 'Artistic personal projects exploring black and white photography, intimate portraiture, and creative experimentation.',
      'all': 'Complete portfolio spanning fashion campaigns, editorial work, and personal projects with a distinctive minimalist aesthetic.'
    };
    return descriptions[cat] || 'Explore the collection';
  };

  // Unknown category — render an inline 404 with noindex so junk URLs don't
  // get indexed and visitors who typo a category see a useful page instead
  // of being silently redirected home.
  if (!isValidCategory) {
    return (
      <>
        <SEO
          title="Category not found - Morgan Blake"
          description="The category you're looking for doesn't exist. Browse the full portfolio for current work."
          canonicalUrl={`/category/${category ?? ""}`}
          noindex
        />

        <PortfolioHeader activeCategory="" />

        <main
          id="main-content"
          className="min-h-screen flex items-center justify-center px-8 pt-20 animate-fade-in"
        >
          <div className="text-center max-w-2xl">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter mb-4">
              404
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-6">
              Category not found
            </h1>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-md mx-auto mb-12">
              Try one of the active categories: Selected, Commissioned, Editorial,
              or Personal.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </main>

        <PortfolioFooter />
      </>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(categoryLower)} - Morgan Blake`,
    "description": getCategoryDescription(categoryLower),
    "url": `https://morganblake.com/category/${categoryLower}`,
    "creator": {
      "@type": "Person",
      "name": "Morgan Blake"
    }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(categoryLower)} - Morgan Blake`}
        description={getCategoryDescription(categoryLower)}
        canonicalUrl={`/category/${categoryLower}`}
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={categoryUpper}
      />

      <main id="main-content">
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && images.length > 0 && (
          <MasonryGallery
            images={images}
            onImageClick={handleImageClick}
          />
        )}

        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}
      </main>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default CategoryGallery;
