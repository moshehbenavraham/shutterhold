import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia, type GalleryItem } from "@/services/gallery";
import { getFeaturedProjects } from "@/data/projects";

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Homepage always shows SELECTED category
  const activeCategory = "SELECTED";
  const featuredProjects = getFeaturedProjects(4);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(activeCategory, 1, 20);
        setDisplayImages(data.items);
      } catch (err) {
        console.error("Error loading gallery media:", err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [activeCategory]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Morgan Blake",
    "jobTitle": "Production Photographer",
    "description": "Production photographer specializing in fashion, editorial, and commercial photography. Creating compelling imagery for global brands and publications.",
    "url": "https://morganblake.com",
    "image": "https://morganblake.com/og-image.jpg",
    "sameAs": [
      "https://instagram.com/morganblake.photo"
    ],
    "knowsAbout": [
      "Fashion Photography",
      "Editorial Photography",
      "Commercial Production",
      "Fashion Campaigns",
      "Brand Photography"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "UK"
    }
  };

  return (
    <>
      <SEO
        title="Morgan Blake - Fashion Production & Photography"
        description="Production photographer specializing in fashion, editorial, and commercial photography. Creating compelling imagery for global brands and publications."
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={activeCategory}
      />

      <main id="main-content">
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && displayImages.length > 0 && (
          <MasonryGallery
            images={displayImages}
            onImageClick={handleImageClick}
          />
        )}

        {!loading && !error && displayImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}

        <section
          aria-labelledby="featured-projects-heading"
          className="max-w-[1600px] mx-auto px-3 md:px-5 pt-16 pb-20 md:pt-20 md:pb-24 border-t border-border mt-16"
        >
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter mb-3">
              PROJECTS
            </p>
            <h2
              id="featured-projects-heading"
              className="font-playfair text-3xl md:text-4xl text-foreground"
            >
              Selected Series
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/project/${project.slug}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted mb-4">
                    <img
                      src={project.cover.src}
                      alt={project.cover.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter mb-1">
                    {project.subtitle} · {project.year}
                  </p>
                  <h3 className="font-playfair text-xl text-foreground group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default Index;
