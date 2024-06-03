function config() {
  const SERVER_URL =
    import.meta.env.VITE_APP_SERVER_URL ?? "http://127.0.0.1:8000";
  return { SERVER_URL };
}

export default config;
