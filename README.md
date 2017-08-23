# gulp-webpack

打包目标

  -使用 gulp 对图片文件进行打包（其他静态资源文件，如字体等自行添加）；
  -使用 webpack 对 js 、css文件进行打包。
    【没有使用gulp处理css、less文件，而是使用webpack的loader进行处理，css、less被require到js文件中，最终会将css、less文件内容插入到html文件中(自动添加style标签到html的head中)。】

示例依赖

gulp
webpack
less

目录结构与说明

├─ src/                                  # 开发目录
    ├─ html/                             # 存放html的目录
        └─ index.html                    
    ├─ images/                           # 存放图片的目录
    ├─ css/                              # 存放css的目录
    ├─ js/                               # 存放js的目录
        └─ lib/                          # 第三方js库
    └─ less/                             # 存放less的目录
        └─ index.less                    
├─ gulpfile.js                           # gulp配置文件
├─ webpack.config.js                     # webpack配置文件
└─ package.json                          # npm包管理文件


1. 安装 NPM

首先，安装 npm。

$ npm install

2. 运行命令

# 开发监控(自动刷新)
  - gulp dev

# 开发(js文件md5)
  - gulp

