const WordRevealParagraph = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
        <p className="text-4xl leading-relaxed font-normal">
            {words.map((word, i) => (
                <span
                    key={i}
                    className="scroll-reveal-word text-zinc-300 inline-block mr-[0.25em]"
                >
                    {word}
                </span>
            ))}
        </p>
    );
};

export default WordRevealParagraph;
