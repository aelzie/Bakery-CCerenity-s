export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Self-hosted fonts (no third-party font requests).
  const fonts = {
    "node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2": "assets/fonts/fraunces-600.woff2",
    "node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff2": "assets/fonts/fraunces-700.woff2",
    "node_modules/@fontsource/nunito/files/nunito-latin-400-normal.woff2": "assets/fonts/nunito-400.woff2",
    "node_modules/@fontsource/nunito/files/nunito-latin-700-normal.woff2": "assets/fonts/nunito-700.woff2",
    "node_modules/@fontsource/nunito/files/nunito-latin-800-normal.woff2": "assets/fonts/nunito-800.woff2",
  };
  eleventyConfig.addPassthroughCopy(fonts);

  eleventyConfig.addFilter("money", (value) => {
    if (typeof value === "number") return `$${value.toFixed(2)}`;
    return value; // placeholders like "[[PRICE]]" pass through untouched
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("isPlaceholder", (value) => typeof value === "string" && value.includes("[["));

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
