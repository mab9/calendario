

export { config, env}

const env = {
    LOCAL: "local",
    DEV: "dev",
    PROD: "prod",
}

const config = {
    lang: 'de',
    languages: ['de', 'en', 'fr'],
    environment: env.LOCAL,
    startMenuEntry: 0,
};
