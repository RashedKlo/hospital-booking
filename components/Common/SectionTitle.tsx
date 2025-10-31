const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
  label,
  variant = "default",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  label?: string;
  variant?: "default" | "accent" | "gradient";
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "accent":
        return "bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent";
      case "gradient":
        return "bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-white";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  return (
    <>
      <div
        className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb }}
      >
        {/* Optional label/badge */}
        {label && (
          <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
              {label}
            </span>
          </div>
        )}

        {/* Title with optional accent line */}
        <div className="relative mb-4">
          {!center && (
            <div className="absolute -right-2 top-0 h-full w-1 rounded-full bg-gradient-to-b from-primary to-transparent"></div>
          )}
          <h2
            className={`text-3xl font-bold leading-tight sm:text-4xl md:text-[45px] lg:text-5xl ${getVariantStyles()}`}
          >
            {title}
          </h2>
        </div>

        {/* Decorative underline for centered titles */}
        {center && (
          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="h-1 w-12 rounded-full bg-primary"></div>
            <div className="h-1 w-2 rounded-full bg-primary/60"></div>
          </div>
        )}

        {/* Paragraph */}
        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
