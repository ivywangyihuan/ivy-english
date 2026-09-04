/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as BankRouteImport } from './routes/bank'
import { Route as PracticeRouteImport } from './routes/practice'
import { Route as ProgressRouteImport } from './routes/progress'
import { Route as SettingsRouteImport } from './routes/settings'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const BankRoute=BankRouteImport.update({id:'/bank',path:'/bank',getParentRoute:()=>rootRouteImport} as any)
const PracticeRoute=PracticeRouteImport.update({id:'/practice',path:'/practice',getParentRoute:()=>rootRouteImport} as any)
const ProgressRoute=ProgressRouteImport.update({id:'/progress',path:'/progress',getParentRoute:()=>rootRouteImport} as any)
const SettingsRoute=SettingsRouteImport.update({id:'/settings',path:'/settings',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath {'/':typeof IndexRoute;'/bank':typeof BankRoute;'/practice':typeof PracticeRoute;'/progress':typeof ProgressRoute;'/settings':typeof SettingsRoute}
export interface FileRoutesByTo {'/':typeof IndexRoute;'/bank':typeof BankRoute;'/practice':typeof PracticeRoute;'/progress':typeof ProgressRoute;'/settings':typeof SettingsRoute}
export interface FileRoutesById {__root__:typeof rootRouteImport;'/':typeof IndexRoute;'/bank':typeof BankRoute;'/practice':typeof PracticeRoute;'/progress':typeof ProgressRoute;'/settings':typeof SettingsRoute}
export interface FileRouteTypes {fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:'/'|'/bank'|'/practice'|'/progress'|'/settings';fileRoutesByTo:FileRoutesByTo;to:'/'|'/bank'|'/practice'|'/progress'|'/settings';id:'__root__'|'/'|'/bank'|'/practice'|'/progress'|'/settings';fileRoutesById:FileRoutesById}
export interface RootRouteChildren {IndexRoute:typeof IndexRoute;BankRoute:typeof BankRoute;PracticeRoute:typeof PracticeRoute;ProgressRoute:typeof ProgressRoute;SettingsRoute:typeof SettingsRoute}
declare module '@tanstack/react-router' {interface FileRoutesByPath {'/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};'/bank':{id:'/bank';path:'/bank';fullPath:'/bank';preLoaderRoute:typeof BankRouteImport;parentRoute:typeof rootRouteImport};'/practice':{id:'/practice';path:'/practice';fullPath:'/practice';preLoaderRoute:typeof PracticeRouteImport;parentRoute:typeof rootRouteImport};'/progress':{id:'/progress';path:'/progress';fullPath:'/progress';preLoaderRoute:typeof ProgressRouteImport;parentRoute:typeof rootRouteImport};'/settings':{id:'/settings';path:'/settings';fullPath:'/settings';preLoaderRoute:typeof SettingsRouteImport;parentRoute:typeof rootRouteImport}}}
const rootRouteChildren:RootRouteChildren={IndexRoute,BankRoute,PracticeRoute,ProgressRoute,SettingsRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {interface Register {ssr:true;router:Awaited<ReturnType<typeof getRouter>>;config:Awaited<ReturnType<typeof startInstance.getOptions>>}}
