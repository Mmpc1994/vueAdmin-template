
export interface ITableTitle {
  label: string;
  prop: string
}

interface IContentConstructor {
  new (): any
}


export class TableService{
  static setTableTitles(ContentConstructor: IContentConstructor): ITableTitle[] {
    const content = new ContentConstructor()
    const tableTitles = [];
    for (let name in content) {
      if (Reflect.hasMetadata('options', content, name)) {
        const label: string = Reflect.getMetadata('options', content, name).label;
        tableTitles.push({
          label,
          prop: name
        })
      }
    }
    return tableTitles;
  }
}