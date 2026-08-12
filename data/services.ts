export interface ServiceItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  href?: string; // some card titles are links, some are plain <p>
  items: ServiceItem[];
}

export const servicesData: ServiceCard[] = [
  {
    title: "Designing",
    href: "/design-services",
    items: [
      { label: "Branding", href: "/design-services" },
      { label: "Logo", href: "/design-services" },
      { label: "Print Design", href: "/design-services" },
      { label: "Motion Graphics", href: "/design-services" },
      { label: "UI/UX", href: "/ui-ux-design-services" },
    ],
  },
  {
    title: "CMS Websites",
    href: "/cms-development-services",
    items: [
      { label: "Webflow", href: "/cms-development-services" },
      { label: "Framer", href: "/cms-development-services" },
      { label: "Wordpress", href: "/wordpress-development-services" },
      { label: "Shopify", href: "/shopify-development-services" },
      { label: "Ecommerce Solutions", href: "/ecommerce-website-development" },
    ],
  },
  {
    title: "Product Development",
    // this one is a <p>, not a link, in the source markup
    items: [
      { label: "Web Apps", href: "/web-development-services" },
      {
        label: "React Native Development",
        href: "/react-native-app-development-services",
      },
      { label: "PHP Development", href: "/php-development-services" },
      {
        label: "MERN Stack Development",
        href: "/software-development-services",
      },
      { label: "QA Solutions", href: "/software-testing-services" },
    ],
  },
  {
    title: "Mobile Apps",
    href: "/mobile-app-development-services",
    items: [
      { label: "Mobile Apps", href: "/mobile-app-development-services" },
      { label: "IOS Mobile Apps", href: "/ios-app-development-services" },
      {
        label: "Android Mobile Apps",
        href: "/android-app-development-services",
      },
      {
        label: "React Native Mobile Apps",
        href: "/react-native-app-development-services",
      },
      { label: "Mobile APP ASO", href: "/mobile-app-development-services" },
    ],
  },
  {
    title: "Marketing",
    // also a <p>, not a link
    items: [
      { label: "SEO", href: "/seo-services" },
      { label: "SEM", href: "/sem-services" },
      { label: "Social Media Marketing", href: "/social-media-services" },
      { label: "PPC Marketing", href: "/social-media-services" },
      { label: "On-Page Optimization", href: "/social-media-services" },
    ],
  },
];

export const headingLines: string[][] = [
  ["We’re", "a", "digital", "&", "tech", "agency"],
  ["making", "brands", "people", "remember"],
];
