import isTableColumn from '@/decorators/isTableColumn.ts';

export interface TableTitle {
  label: string;
  prop: string
}

export default class Table<T> {
  tableTitle: TableTitle[] = [];
  tableData: T[] = [];

  constructor(content: T) {
    for (let name in content) {
      if (Reflect.hasMetadata('options', content, name)) {
        const label: string = Reflect.getMetadata('options', content, name).label;
        this.tableTitle.push({
          label: label,
          prop: name
        })
      }
    }
  }

  setTableData() {
    
  }
}
