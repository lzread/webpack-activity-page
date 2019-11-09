module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 32,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing','padding','margin'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }
    }
}