import autumnTrees from "@/assets/gallery/autumn-trees.jpg";
import barnDetail from "@/assets/gallery/barn-detail.jpg";
import commissioned1 from "@/assets/gallery/commissioned-1.jpg";
import commissioned2 from "@/assets/gallery/commissioned-2.jpg";
import commissioned3 from "@/assets/gallery/commissioned-3.jpg";
import commissioned4 from "@/assets/gallery/commissioned-4.jpg";
import commissioned5 from "@/assets/gallery/commissioned-5.jpg";
import countryRoad from "@/assets/gallery/country-road.jpg";
import editorial1 from "@/assets/gallery/editorial-1.jpg";
import editorial2 from "@/assets/gallery/editorial-2.jpg";
import editorial3 from "@/assets/gallery/editorial-3.jpg";
import editorial4 from "@/assets/gallery/editorial-4.jpg";
import editorial5 from "@/assets/gallery/editorial-5.jpg";
import farmhouse from "@/assets/gallery/farmhouse.jpg";
import forestPath from "@/assets/gallery/forest-path.jpg";
import lakeReflection from "@/assets/gallery/lake-reflection.jpg";
import marie1 from "@/assets/gallery/marie-1.jpg";
import marie2 from "@/assets/gallery/marie-2.jpg";
import marie3 from "@/assets/gallery/marie-3.jpg";
import marie4 from "@/assets/gallery/marie-4.jpg";
import morningFog from "@/assets/gallery/morning-fog.jpg";
import mountainVista from "@/assets/gallery/mountain-vista.jpg";
import personal1 from "@/assets/gallery/personal-1.jpg";
import personal2 from "@/assets/gallery/personal-2.jpg";
import personal3 from "@/assets/gallery/personal-3.jpg";
import prairieSunset from "@/assets/gallery/prairie-sunset.jpg";
import selected1 from "@/assets/gallery/selected-1.jpg";
import selected2 from "@/assets/gallery/selected-2.jpg";
import selected3 from "@/assets/gallery/selected-3.jpg";
import selected4 from "@/assets/gallery/selected-4.jpg";
import stoneWall from "@/assets/gallery/stone-wall.jpg";
import wheatField from "@/assets/gallery/wheat-field.jpg";
import winterLandscape from "@/assets/gallery/winter-landscape.jpg";
import portraitSrc from "@/assets/morgan-portrait.jpg";

export interface GalleryItem {
  type?: "image";
  src: string;
  highResSrc?: string;
  alt: string;
  photographer?: string;
  client?: string;
  location?: string;
  details?: string;
  category: "SELECTED" | "COMMISSIONED" | "EDITORIAL" | "PERSONAL";
  width: number;
  height: number;
}

interface PortraitImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const createImage = (
  src: string,
  alt: string,
  category: GalleryItem["category"],
  client: string,
  location: string,
  details: string,
  width: number,
  height: number,
): GalleryItem => ({
  type: "image",
  src,
  highResSrc: src,
  alt,
  photographer: "Morgan Blake",
  client,
  location,
  details,
  category,
  width,
  height,
});

export const galleryItems: GalleryItem[] = [
  createImage(selected1, "Model in tailored editorial look against a neutral studio wall", "SELECTED", "Atelier North", "London", "Autumn campaign study", 1280, 896),
  createImage(selected2, "Minimal fashion portrait with structured coat and soft window light", "SELECTED", "Maison Vale", "Paris", "Ready-to-wear lookbook", 1280, 896),
  createImage(selected3, "Editorial beauty detail with clean styling and monochrome palette", "SELECTED", "Issue Studio", "Milan", "Magazine beauty feature", 1280, 896),
  createImage(selected4, "Fashion model seated in sculptural silhouette under daylight", "SELECTED", "Northline", "Copenhagen", "Resort collection preview", 1280, 896),
  createImage(commissioned1, "Commercial campaign image with model and polished studio styling", "COMMISSIONED", "Vesper Goods", "New York", "Spring product campaign", 1280, 896),
  createImage(commissioned2, "Studio product story with fashion accessories and crisp composition", "COMMISSIONED", "Lane & Co.", "London", "Accessory launch package", 1280, 896),
  createImage(commissioned3, "Editorial product portrait with luxury fabric and warm light", "COMMISSIONED", "Aurum House", "Milan", "Brand refresh imagery", 1280, 896),
  createImage(commissioned4, "Model wearing monochrome campaign styling in clean production frame", "COMMISSIONED", "Calder Studio", "Paris", "Capsule collection shoot", 1280, 896),
  createImage(commissioned5, "Fashion campaign detail with jewelry styling and close crop", "COMMISSIONED", "Kline Objects", "Berlin", "Seasonal campaign detail", 1280, 896),
  createImage(editorial1, "Magazine fashion portrait with directional pose and soft tones", "EDITORIAL", "Frame Quarterly", "London", "Cover story session", 1280, 896),
  createImage(editorial2, "Editorial model study with layered textiles and strong silhouette", "EDITORIAL", "Studio Paper", "Paris", "Feature editorial", 1280, 896),
  createImage(editorial3, "Beauty editorial image with refined makeup and controlled light", "EDITORIAL", "Mode Review", "Milan", "Beauty direction feature", 1280, 896),
  createImage(editorial4, "Minimal fashion spread with negative space and sculptural styling", "EDITORIAL", "Quiet Form", "Copenhagen", "Designer profile", 1280, 896),
  createImage(editorial5, "Fashion portrait with black wardrobe and clean backdrop", "EDITORIAL", "Line Magazine", "Berlin", "Monochrome fashion story", 1280, 896),
  createImage(personal1, "Personal portrait study in muted natural light", "PERSONAL", "Personal Work", "London", "Ongoing portrait archive", 1280, 896),
  createImage(personal2, "Black and white personal portrait with close framing", "PERSONAL", "Personal Work", "Paris", "Available light study", 1280, 896),
  createImage(personal3, "Experimental fashion portrait with quiet expression and shadow", "PERSONAL", "Personal Work", "Berlin", "Personal series excerpt", 1280, 896),
  createImage(marie1, "Portrait series image with calm expression and natural styling", "PERSONAL", "Personal Work", "Copenhagen", "Marie portrait study", 1280, 896),
  createImage(marie2, "Intimate portrait with neutral wardrobe and daylight", "PERSONAL", "Personal Work", "Copenhagen", "Marie portrait study", 1280, 896),
  createImage(marie3, "Personal editorial portrait with restrained composition", "PERSONAL", "Personal Work", "Copenhagen", "Marie portrait study", 1280, 896),
  createImage(marie4, "Close portrait with soft contrast and minimal styling", "PERSONAL", "Personal Work", "Copenhagen", "Marie portrait study", 1280, 896),
  createImage(mountainVista, "Mountain vista from an alpine location scout", "PERSONAL", "Personal Work", "Dolomites", "Location research frame", 1200, 900),
  createImage(forestPath, "Forest path photographed during a production scout", "PERSONAL", "Personal Work", "Surrey", "Location research frame", 900, 1200),
  createImage(lakeReflection, "Lake reflection captured during early morning location work", "PERSONAL", "Personal Work", "Como", "Location research frame", 1200, 900),
  createImage(autumnTrees, "Autumn trees from a countryside location scout", "PERSONAL", "Personal Work", "Kent", "Location research frame", 900, 1200),
  createImage(barnDetail, "Barn detail photographed as production reference", "PERSONAL", "Personal Work", "Oxfordshire", "Texture study", 1200, 900),
  createImage(countryRoad, "Country road photographed for moodboard reference", "PERSONAL", "Personal Work", "Cotswolds", "Location research frame", 900, 1200),
  createImage(farmhouse, "Farmhouse exterior captured for a rural production concept", "PERSONAL", "Personal Work", "Yorkshire", "Location research frame", 1200, 900),
  createImage(morningFog, "Morning fog across an open field", "PERSONAL", "Personal Work", "Norfolk", "Atmosphere study", 1200, 900),
  createImage(prairieSunset, "Low sun across an open field during location research", "PERSONAL", "Personal Work", "Sussex", "Atmosphere study", 1200, 900),
  createImage(stoneWall, "Stone wall texture from a location scout", "PERSONAL", "Personal Work", "Cotswolds", "Texture study", 1200, 900),
  createImage(wheatField, "Wheat field photographed as summer campaign reference", "PERSONAL", "Personal Work", "Norfolk", "Location research frame", 1200, 900),
  createImage(winterLandscape, "Winter landscape from a cold-weather production scout", "PERSONAL", "Personal Work", "Scotland", "Location research frame", 1200, 900),
];

export const portraitImage: PortraitImage = {
  src: portraitSrc,
  alt: "Morgan Blake portrait",
  width: 1200,
  height: 801,
};

export const fetchMixedMedia = async (
  category: string,
  page = 1,
  totalItems = 20,
) => {
  const normalizedCategory = category.toUpperCase();
  const filteredItems =
    normalizedCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === normalizedCategory);

  const start = Math.max(page - 1, 0) * totalItems;
  const items = filteredItems.slice(start, start + totalItems);

  return {
    items,
    total_results: filteredItems.length,
  };
};
