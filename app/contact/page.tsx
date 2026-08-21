
import { Metadata } from "next";
import ContactContent from "./content";

export const metadata: Metadata = {
    title: "Contact Palette & Pixel | Let’s Build Something for the Future",
    description: "Get in touch with our team of experts to discuss your product vision, brand scaling, design systems, or growth partnership opportunities.",
};

export default function ContactPage() {


    return (
        <ContactContent />
    );
}