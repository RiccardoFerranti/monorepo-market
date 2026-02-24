export const MARKETS = {
  // en
  en: {
    welcome: "Welcome",
    nav: {
      home: "Home",
      products: "Products",
      login: "Login",
      logout: "Logout",
    },
    pages: {
      welcome: {
        hero: {
          marketLabel: "EN market",
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
      products: {
        title: "Products",
      },
      product: {
        backToProducts: "Back to products",
        authNotice:
          "Sign in to see warranty, shipping, reviews and other details.",
        notFound: {
          title: "Product not found",
          description: "This product does not exist or may have been removed.",
        },
      },
      login: {
        title: "Login",
        usernameLabel: "Username",
        passwordLabel: "Password",
        submit: "Sign in",
        errors: {
          missingFields: "Username and password are required.",
          invalidCredentials: "Invalid username or password.",
          apiMissing: "Login service unavailable.",
          loginFailed: "Login failed. Please try again.",
          tooShort: "Username and password must be at least 3 characters.",
        },
      },
      notFound: {
        title: "Page not found",
        description:
          "The page you are looking for does not exist or may have been moved.",
        backHome: "Back to home",
      },
    },
  },
  // ca (French)
  ca: {
    welcome: "Bienvenue",
    nav: {
      home: "Accueil",
      products: "Produits",
      login: "Connexion",
      logout: "Déconnexion",
    },
    pages: {
      welcome: {
        hero: {
          marketLabel: "Marché CA",
          description:
            "Un portail produit évolutif construit en monorepo avec une UI partagée, une configuration par marque et un routage par marché.",
          ctaPrimary: "Voir les produits",
          ctaSecondary: "Connexion",
        },
        highlights: {
          marketAwareTitle: "Par marché",
          marketAwareDesc:
            "Le contenu et la navigation s’adaptent à /en et /ca.",
          brandConfigTitle: "Configuré par marque",
          brandConfigDesc:
            "Les composants partagés changent selon la marque sans duplication.",
          seoTitle: "Optimisé SEO",
          seoDesc: "Produits servis via ISR/SSR avec contenu rafraîchi.",
        },
      },
      products: {
        title: "Produits",
      },
      product: {
        backToProducts: "Retour aux produits",
        authNotice:
          "Connectez-vous pour voir la garantie, la livraison, les avis et d'autres informations.",
        notFound: {
          title: "Produit introuvable",
          description: "Ce produit n'existe pas ou a été supprimé.",
        },
      },
      login: {
        title: "Connexion",
        usernameLabel: "Nom d'utilisateur",
        passwordLabel: "Mot de passe",
        submit: "Se connecter",
        errors: {
          missingFields: "Nom d'utilisateur et mot de passe requis.",
          invalidCredentials: "Identifiants invalides.",
          apiMissing: "Service de connexion indisponible.",
          loginFailed: "Échec de la connexion. Veuillez réessayer.",
          tooShort:
            "Le nom d'utilisateur et le mot de passe doivent contenir au moins 3 caractères.",
        },
      },
      notFound: {
        title: "Page introuvable",
        description:
          "La page que vous recherchez n'existe pas ou a été déplacée.",
        backHome: "Retour à l'accueil",
      },
    },
  },
} as const;
