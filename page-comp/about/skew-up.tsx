const SkewUpParagraph = ({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) => {
    const words = text.split(" ");
    return (
        <p data-skew-up className={className}>
            {words.map((word, i) => (
                <span key={i} className="word inline-block">
                    {word}
                    {i < words.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </p>
    );
};

export default SkewUpParagraph;