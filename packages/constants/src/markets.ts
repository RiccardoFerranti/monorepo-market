export const MARKETS = {
  en: {
    welcome: "Welcome",
    nav: {
      home: "Home",
      products: "Products",
      login: "Login",
    },
    hero: {
      marketLabel: "EN market",
      titleSuffix: "to ProjectA",
      description:
        "A scalable product portal built in a monorepo with shared UI, brand configuration, and market-aware routing.",
      ctaPrimary: "Browse products",
      ctaSecondary: "Login",
    },
    highlights: {
      marketAwareTitle: "Market-aware",
      marketAwareDesc: "Content and navigation adapt to /en and /ca.",
      brandConfigTitle: "Brand-configurable",
      brandConfigDesc:
        "Shared components render per brand with minimal duplication.",
      seoTitle: "SEO-friendly",
      seoDesc: "Products can be served via ISR/SSR with fresh content.",
    },
  },
  ca: {
    welcome: "Bienvenue",
    nav: {
      home: "Accueil",
      products: "Produits",
      login: "Connexion",
    },
    hero: {
      marketLabel: "Marché CA",
      titleSuffix: "sur ProjectA",
      description:
        "Un portail produit évolutif construit en monorepo avec une UI partagée, une configuration par marque et un routage par marché.",
      ctaPrimary: "Voir les produits",
      ctaSecondary: "Connexion",
    },
    highlights: {
      marketAwareTitle: "Par marché",
      marketAwareDesc: "Le contenu et la navigation s’adaptent à /en et /ca.",
      brandConfigTitle: "Configuré par marque",
      brandConfigDesc:
        "Les composants partagés changent selon la marque sans duplication.",
      seoTitle: "Optimisé SEO",
      seoDesc: "Produits servis via ISR/SSR avec contenu rafraîchi.",
    },
  },
} as const;