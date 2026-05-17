import alpineCover from "@/assets/projects/alpine-light-cover.jpg";
import alpine1 from "@/assets/projects/alpine-1.jpg";
import alpine2 from "@/assets/projects/alpine-2.jpg";
import alpine3 from "@/assets/projects/alpine-3.jpg";
import alpine4 from "@/assets/projects/alpine-4.jpg";
import alpine5 from "@/assets/projects/alpine-5.jpg";
import alpine6 from "@/assets/projects/alpine-6.jpg";
import alpine7 from "@/assets/projects/alpine-7.jpg";
import alpine8 from "@/assets/projects/alpine-8.jpg";
import prairieCover from "@/assets/projects/prairie-stories-cover.jpg";
import homesteadCover from "@/assets/projects/homestead-cover.jpg";
import forgottenRoadsCover from "@/assets/projects/forgotten-roads-cover.jpg";

export type ProjectImage = {
  src: string;
  caption: string;
};

export type ProjectCategory = "EDITORIAL" | "COMMISSIONED" | "PERSONAL" | "SELECTED";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  description: string;
  cover: {
    src: string;
    alt: string;
  };
  /**
   * Optional sequenced image series. When empty, the project page renders
   * the cover hero only and skips the sequenced section.
   */
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "alpine-light",
    title: "Alpine Light",
    subtitle: "Mountain Series",
    category: "PERSONAL",
    year: "2024",
    description:
      "A collection of images capturing the ethereal quality of early morning light in mountain landscapes. These photographs explore the delicate balance between shadow and illumination in high-altitude environments.",
    cover: {
      src: alpineCover,
      alt: "Alpine Light project cover — early morning light on a mountain ridge",
    },
    images: [
      { src: alpine1, caption: "First Light on Summit Ridge" },
      { src: alpine2, caption: "Valley Mist" },
      { src: alpine3, caption: "Alpine Meadow" },
      { src: alpine4, caption: "Glacial Lake" },
      { src: alpine5, caption: "Ridge Line" },
      { src: alpine6, caption: "Morning Reflection" },
      { src: alpine7, caption: "Alpine Stream" },
      { src: alpine8, caption: "Golden Hour Peak" },
    ],
  },
  {
    slug: "prairie-stories",
    title: "Prairie Stories",
    subtitle: "Open Country",
    category: "PERSONAL",
    year: "2024",
    description:
      "A long-form study of the open prairie in late summer. Wind, low sun, and dry grass become the language of the frame, with composition built around the horizon line rather than the subject. The work was made over a single season as a moodboard reference for editorial production scouting.",
    cover: {
      src: prairieCover,
      alt: "Prairie Stories project cover — low sun across an open field",
    },
    images: [],
  },
  {
    slug: "homestead",
    title: "Homestead",
    subtitle: "Rural Architecture",
    category: "PERSONAL",
    year: "2023",
    description:
      "Quiet structures in rural landscapes — barns, farmhouses, and stone walls photographed as production reference for location-led campaigns. The series favours material, weather, and surface over occupant, treating each building as a still life in its own light.",
    cover: {
      src: homesteadCover,
      alt: "Homestead project cover — farmhouse exterior in soft daylight",
    },
    images: [],
  },
  {
    slug: "forgotten-roads",
    title: "Forgotten Roads",
    subtitle: "Atmosphere Studies",
    category: "PERSONAL",
    year: "2023",
    description:
      "Country roads, hedgerow lines, and edge-of-village geometry — made during scouting trips that never resulted in a shoot. The work sits between travel and production research: a record of routes the camera passed through without stopping, gathered as a single atmospheric set.",
    cover: {
      src: forgottenRoadsCover,
      alt: "Forgotten Roads project cover — empty country road at dusk",
    },
    images: [],
  },
];

export const projectSlugs: string[] = projects.map((p) => p.slug);

export const getProjectBySlug = (slug: string | undefined): Project | undefined => {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
};

export const getOtherProjects = (slug: string | undefined, limit = 3): Project[] => {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
};

export const getFeaturedProjects = (limit = 4): Project[] => {
  return projects.slice(0, limit);
};
