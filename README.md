# 国网项目基座
# pnpm + Vue 3 + TypeScript + Vite

```shell
echo "# state-grid" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/Lemon-Cai/state-grid.git
git push -u origin master
```

```shell
# 安装依赖，
pnpm i @pnpm/find-workspace-packages

```
获取本地子项目的package.json中项目名称
```js
import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { resolve } from 'path'

const projRoot = resolve(__dirname, '')

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
export const getWorkspaceNames = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages(projRoot)
  return pkgs
    .filter((pkg) => pkg.dir.startsWith(dir))
    .map((pkg) => pkg.manifest.name)
    .filter((name): name is string => !!name)
}
```