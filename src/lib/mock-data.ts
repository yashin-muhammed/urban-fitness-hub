import heroGym from "@/assets/hero-gym.jpg";
import reviewGadgets from "@/assets/review-gadgets.jpg";
import reviewTreadmill from "@/assets/review-treadmill.jpg";
import productDumbbell from "@/assets/product-dumbbell.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productMat from "@/assets/product-mat.jpg";
import productBands from "@/assets/product-bands.jpg";
import eventExpo from "@/assets/event-expo.jpg";

export const heroArticle = {
  slug: "best-adjustable-dumbbells-2026",
  category: "Reviews",
  title: "The Best Adjustable Dumbbells of 2026 — Tested in Dubai's Top Home Gyms",
  excerpt:
    "We spent eight weeks pushing twelve adjustable dumbbell systems through real workouts. Here are the four that survived — and the one that genuinely changed how we train at home.",
  cover: heroGym,
  author: "Layla Hassan",
  readTime: "12 min read",
  date: "May 18, 2026",
};

export const articles = [
  {
    slug: "smart-rings-vs-watches",
    category: "Gadgets",
    title: "Smart Rings vs Fitness Watches: What Actually Tracks Better?",
    excerpt: "We strapped a ring, watch and chest strap on the same athlete for 30 days.",
    cover: reviewGadgets,
    author: "Omar Khalid",
    readTime: "8 min",
    date: "May 12, 2026",
  },
  {
    slug: "best-foldable-treadmills",
    category: "Home Gym",
    title: "5 Foldable Treadmills That Fit Under Any Apartment Couch",
    excerpt: "Compact, quiet and surprisingly capable — perfect for UAE high-rises.",
    cover: reviewTreadmill,
    author: "Sara Mansour",
    readTime: "10 min",
    date: "May 9, 2026",
  },
  {
    slug: "dubai-fitness-expo-2026",
    category: "Events",
    title: "Dubai Fitness Expo 2026: Everything Launching This November",
    excerpt: "From AI-coached cable machines to recovery tech you can actually afford.",
    cover: eventExpo,
    author: "Editorial",
    readTime: "6 min",
    date: "May 4, 2026",
  },
];

export type Product = {
  id: string;
  title: string;
  brand: string;
  image: string;
  price: string;
  rating: number;
  badge?: string;
  affiliate: string;
};

export const products: Product[] = [
  {
    id: "p1",
    title: "PowerBlock Pro 50 Adjustable Dumbbells",
    brand: "PowerBlock",
    image: productDumbbell,
    price: "AED 2,499",
    rating: 4.8,
    badge: "Editor's Choice",
    affiliate: "#",
  },
  {
    id: "p2",
    title: "Garmin Forerunner 965 GPS Watch",
    brand: "Garmin",
    image: productWatch,
    price: "AED 2,199",
    rating: 4.7,
    badge: "Best Value",
    affiliate: "#",
  },
  {
    id: "p3",
    title: "Manduka PRO Yoga Mat 6mm",
    brand: "Manduka",
    image: productMat,
    price: "AED 549",
    rating: 4.9,
    affiliate: "#",
  },
  {
    id: "p4",
    title: "TheraBand Resistance Bands Set",
    brand: "TheraBand",
    image: productBands,
    price: "AED 189",
    rating: 4.6,
    badge: "Best Budget",
    affiliate: "#",
  },
];

export const events = [
  {
    title: "Dubai Fitness Challenge 2026",
    date: "Nov 1 – Nov 30, 2026",
    location: "Dubai, UAE",
    image: eventExpo,
  },
  {
    title: "Abu Dhabi Strength Summit",
    date: "Jul 14, 2026",
    location: "ADNEC, Abu Dhabi",
    image: reviewGadgets,
  },
  {
    title: "Sharjah Run Festival",
    date: "Sep 22, 2026",
    location: "Al Majaz Waterfront",
    image: reviewTreadmill,
  },
];

export const brands = ["Garmin", "PowerBlock", "Hyperice", "WHOOP", "Technogym", "Manduka", "TheraBand", "Polar"];

export const categories = ["All", "Reviews", "Gadgets", "Home Gym", "News", "Events", "Guides"];
