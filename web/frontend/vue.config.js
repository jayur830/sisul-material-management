module.exports = {
    devServer: {
        proxy: "http://192.168.219.165:9200"
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "응급보수자재관리";
            return args;
        });
    }
};
