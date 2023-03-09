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
