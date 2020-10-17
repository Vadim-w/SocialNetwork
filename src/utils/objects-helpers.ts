
export const updateObjectInArray = (items: any, itemID: string, objPropName: any,  newObjProps: any) => {
    items.map((u: any) => {
        if (u[objPropName] === itemID) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}