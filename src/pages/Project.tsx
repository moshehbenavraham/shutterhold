import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { getProjectBySlug, getOtherProjects } from "@/data/projects";

const SITE_URL = "https://morganblake.com";

const Project = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  // Unknown slug — render an inline 404 with noindex so junk URLs don't get
  // indexed and visitors who typo a slug actually see a useful page instead
  // of being silently redirected home (the m64 anti-pattern).
  if (!project) {
    return (
      <>
        <SEO
          title="Project not found - Morgan Blake"
          description="The project you're looking for doesn't exist or has been moved."
          canonicalUrl={`/project/${slug ?? ""}`}
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
              Project not found
            </h1>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-md mx-auto mb-12">
              The project you're looking for doesn't exist or has been moved.
              Browse the full portfolio for current work.
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

  const canonicalPath = `/project/${project.slug}`;
  const otherProjects = getOtherProjects(project.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": project.title,
    "description": project.description,
    "url": `${SITE_URL}${canonicalPath}`,
    "creator": {
      "@type": "Person",
      "name": "Morgan Blake",
      "url": SITE_URL,
    },
    "about": {
      "@type": "Thing",
      "name": project.subtitle,
    },
    "image":
      project.images.length > 0
        ? project.images.map((img) => ({
            "@type": "ImageObject",
            "contentUrl": `${SITE_URL}${img.src}`,
            "caption": img.caption,
            "creator": {
              "@type": "Person",
              "name": "Morgan Blake",
            },
          }))
        : [
            {
              "@type": "ImageObject",
              "contentUrl": `${SITE_URL}${project.cover.src}`,
              "caption": project.cover.alt,
              "creator": {
                "@type": "Person",
                "name": "Morgan Blake",
              },
            },
          ],
    "datePublished": project.year,
    "inLanguage": "en-US",
  };

  return (
    <>
      <SEO
        title={`${project.title} - Morgan Blake`}
        description={project.description}
        canonicalUrl={canonicalPath}
        ogType="article"
        ogImage={project.cover.src}
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory={project.category} />

      <main id="main-content">
        <header className="px-8 pt-28 pb-12 md:pt-32 md:pb-16 max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter mb-4">
            {project.subtitle} · {project.year}
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-6">
            {project.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80">
            {project.description}
          </p>
        </header>

        <div className="max-w-[1600px] mx-auto px-3 md:px-5 pb-12 md:pb-16">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {project.images.length > 0 && (
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 pb-20 animate-fade-in">
            {project.images.map((image) => (
              <figure key={image.src}>
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <figcaption className="px-8 py-4 text-sm text-muted-foreground italic text-center">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {otherProjects.length > 0 && (
          <section
            aria-labelledby="more-work-heading"
            className="border-t border-border"
          >
            <h2
              id="more-work-heading"
              className="sr-only"
            >
              More work
            </h2>
            <ul className="divide-y divide-border">
              {otherProjects.map((other) => (
                <li key={other.slug}>
                  <Link
                    to={`/project/${other.slug}`}
                    className="flex items-center justify-between px-8 py-10 md:py-12 hover:bg-muted transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter mb-2">
                        {other.subtitle} · {other.year}
                      </p>
                      <h3 className="font-playfair text-2xl md:text-3xl text-foreground group-hover:translate-x-2 transition-transform duration-300">
                        {other.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <PortfolioFooter />
    </>
  );
};

export default Project;
