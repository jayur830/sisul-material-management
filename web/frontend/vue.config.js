module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:9100"
            }
        }
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "응급보수자재관리";
            return args;
        });
    }
};
