var WebpackObfuscator = require('webpack-obfuscator');

// ...

// webpack plugins array
module.exports = {
    plugins: [
        new WebpackObfuscator ({
            rotateStringArray: true
        }, [])
    ],

    // webpack loader rules array
    rules: [
    {
        test: /\.js$/,
        enforce: 'post',
        use: { 
            loader: WebpackObfuscator.loader, 
            options: {
                rotateStringArray: true
            }
        }
    }
]
}
