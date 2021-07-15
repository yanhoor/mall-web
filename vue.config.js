
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');


function getCurrentDate(format) {
    const now = new Date()
    const year = now.getFullYear() // 得到年份
    let month = now.getMonth() // 得到月份
    let date = now.getDate() // 得到日期
    let hour = now.getHours() // 得到小时
    let minus = now.getMinutes() // 得到分钟
    let sec = now.getSeconds() // 得到秒
    month += 1
    if (month < 10) month = `0${month}`
    if (date < 10) date = `0${date}`
    if (hour < 10) hour = `0${hour}`
    if (minus < 10) minus = `0${minus}`
    if (sec < 10) sec = `0${sec}`
    let time = `${year}${month}${date}${hour}${minus}${sec}`
    // 精确到天
    if (format === 1) {
        time = `${year}${month}${date}`
    } else if (format === 2) { // 精确到分
        time = `${year}${month}${date}${hour}${minus}`
    }
    return time
}

const nowDate = getCurrentDate();
const outputDir = `dist/mall_web_${process.env.NODE_ENV}_${nowDate}`;

console.log('当前时间-->', nowDate);

module.exports = {
    publicPath: './',
    outputDir: path.resolve(__dirname, outputDir), // 构建文件输出目录
    assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'src/main.ts', // 入口
            template: 'public/index.html', // 模板
            filename: 'index.html', //构建后输出的文件
            title: 'mall-web',
            chunks: ['chunk-vendors', 'chunk-common', 'index'], // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        algorithm: 'gzip',
                        test: /\.(js|css)$/,// 匹配文件名
                        threshold: 10240, // 对超过10k的数据压缩
                        deleteOriginalAssets: false, // 不删除源文件
                        minRatio: 0.8 // 压缩比
                    })
                ]
            }
        }
    },
    css: {
        extract: true, // css分离出来作为单独文件
        loaderOptions: {

        }
    },
    devServer: {
        // host: '0.0.0.0',
        hot: true,
        port: '9099',
        open: false, // 配置自动启动浏览器
        // hotOnly: true,
        https: false,
        compress: true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            // 本地运行时，axios的baseUrl为”/api“
            '/api': {
                target: `${process.env.VUE_APP_BASE_URL}`, // /mobile/XXX的api都请求到这个地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
