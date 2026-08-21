export type Service = {
    index: string;
    title: string;
    tagline: string;
    bullets: string[];
    closing: string;
    image: string;
};

export type CompanyItem = {
    name: string;
    img: string;
}

// export interface Stage {
//     letter: string;
//     index: number; // position within AARRR, used for the 3D ring highlight (0-4)
//     name: string;
//     whatWeDo: string[];
//     measure: string;
//     image: string; // TEMP: replace with your own media
// };