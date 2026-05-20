export const config = {
    baseUrl : process.env.NEXT_PUBLIC_API_URL!,
}

if (!config.baseUrl) {
  throw new Error("base url is not set in .env");
}