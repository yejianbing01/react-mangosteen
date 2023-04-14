1. npm create vite@3.1.0 react-mongosteen -- --template react-ts
2. 初始化 git 仓库

```sh
    git init
    git add .
    git commit -v
```

3. github 部署静态页面
   - 将 build 后的 dist 目录部署到 github
   ```sh
        # --base 指定根目录，否则找不到js文件
       npm run build -- --base=react-mongosteen-preview
       # 部署脚本
       #!/usr/bin/env bash
        rm -rf dist
        npm run build -- --base=react-mongosteen-preview
        cd dist
        git init
        git add .
        git commit -m deploy
        git remote add origin https://github.com/yejianbing01/react-mongosteen-preview.git
        git push -f origin main:main
        cd -
   ```
   给脚本增加执行权限
   ```sh
   chmod +x deploy_to_github.sh
   ```
   部署直接执行 deploy_to_github.sh

4. 增加React snippets

5. 配置eslint：https://github.com/antfu/eslint-config
    - 添加.editorconfig 统一不同的编辑器的代码样式 https://editorconfig.org/
    ```sh
    root = true

    [*]
    end_of_line = lf
    insert_final_newline = true
    charset = utf-8
    # indent_style = space
    # indent_size = 2
    indent_style = tab
    tab_width = 2
    trim_trailing_whitespace = true
    ```
    - 安装[eslint](https://eslint.bootcss.com/docs/rules/)
    npm install eslint
    - VSCode设置--工作区--搜索 formatter --设置default formatter==ESLint
    - VSCode设置--工作区--搜索codeActions---Editor: Code Actions On Save--"source.fixAll": true

6. 增加路由[react-router-dom](https://reactrouter.com/en/main/start/tutorial)

7. CSS IN JS
    - CSS Module
    可以配合[classnames](https://github.com/JedWatson/classnames)
    - [styled-components](https://styled-components.com/)

    - Tailwind.css/[WindiCSS](https://windicss.org/utilities/general/colors.html)/[Unocss](https://github.com/unocss/unocss)
        - unocss插件 "UnoCSS"
    
8. Mock
    - [vit-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)

9. [axios封装](https://juejin.cn/post/6844903569745788941)

10. [swr](https://github.com/vercel/swr)

11. ***bug***: 1.transform 导致fixed失败 2.cursor-pointer导致点击出现蓝色闪烁

12. vite版本升级
```sh
# 查询npm依赖包信息
npm info vite versions
```
13. axios封装，拦截器展示loading

14. react-router load做路由守卫

15. 使用 swr preload 预请求接口

16. 使用react-use库读取hash值