import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')

export const utilRoot = resolve(pkgRoot, 'utils')

// // Docs
// export const docsDirName = 'docs'
// export const docRoot = resolve(projRoot, docsDirName)
// export const vpRoot = resolve(docRoot, '.vitepress')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

export const projPackage = resolve(projRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
