module.exports = {
  extends: [
    "next/core-web-vitals", // Add this line to include Next.js ESLint plugin
  ],
  rules: {
    // Disable most rules temporarily
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    // Keep only basic syntax rules
    "semi": "error",
    "quotes": ["error", "single"]
  },
};