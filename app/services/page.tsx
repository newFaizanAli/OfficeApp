import { Metadata } from "next";
import ServicesContent from "./content";

export const metadata: Metadata = {
    title: "Services | Product Positioning, Branding, Production, Marketing & Funding",
    description: "Explore our end-to-end solutions for founders: strategic product positioning, high-impact branding, production, marketing, and investor funding.",
};


export default function ServicesPage() {

    return (
        <ServicesContent />
    );
}