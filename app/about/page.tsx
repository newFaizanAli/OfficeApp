
import { Metadata } from "next";
import AboutContent from "./content";


export const metadata: Metadata = {
    title: "About Palette & Pixel | Where Ideas Turn Into Scalable Businesses",
    description: "Learn more about our new-age product solution agency and how we help founders build, launch, and scale powerful brands.",
};


function AboutPage() {

    return (
        <AboutContent />
    );
}

export default AboutPage