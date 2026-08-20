const WordRevealParagraph = ({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) => {
    const words = text.split(" ");
    return (
        <p className={`scroll-reveal-block leading-relaxed font-normal ${className}`}>
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