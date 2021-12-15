

export { config, env}

const env = {
    LOCAL: "local",
    DEV: "dev",
    PROD: "prod",
}

const config = {
    lang: 'de',
    langTranslations: ['de', 'en'],
    environment: env.LOCAL,
    startMenuEntry: 0,
};
