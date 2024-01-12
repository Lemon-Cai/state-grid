import { resolve } from 'path'

// 项目根目录
export const projRoot = resolve(__dirname, '..', '..')

export const pkgRoot = resolve(projRoot, 'packages')

export const uiRoot = resolve(pkgRoot, 'ui')
export const cmpRoot = resolve(pkgRoot, 'components')
export const utilsRoot = resolve(pkgRoot, 'utils')


export const outputPath = resolve(uiRoot, 'dist')