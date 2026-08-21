import { Metadata } from "next";
import ProcessContent from "./content";


export const metadata: Metadata = {
    title: "Our Working Funnel | The AARRR Growth Framework",
    description: "Discover our step-by-step growth funnel built on the AARRR framework to acquire, activate, retain, and scale your user base effectively.",
};


export default function ProcessPage() {



    return (
        <ProcessContent />
    );
}