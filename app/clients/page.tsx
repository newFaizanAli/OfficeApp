import { Metadata } from "next";
import ClientContent from "./content";


export const metadata: Metadata = {
    title: "Our Clients | Huawei, Daraz, Casio, Payoneer & More",
    description: "Discover the industry-leading brands, global enterprises, and ambitious founders who trust Palette & Pixel to build, launch, and scale their products.",
};

//  contact page
export default function ClientsCollaboratorsPage() {


    return (
        <ClientContent />
    );
}