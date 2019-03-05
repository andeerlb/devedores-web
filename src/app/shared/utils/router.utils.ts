export class RouterUtils {
    static createRegister(path:string, viewComponent: any, editComponent: any) {
        return {
            path: path,
            children: [
                { path: '', component: viewComponent },
                { path: 'create', component: editComponent },
                { path: 'edit/:id', component: editComponent },
                { path: 'view', component: viewComponent },
            ]
        }
    }
}