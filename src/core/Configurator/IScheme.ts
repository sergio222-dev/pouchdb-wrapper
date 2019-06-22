export interface IScheme {
  name: string;
  // class: any;
  relations?: IHasMany | IBelongTo;
}

interface IHasMany {
  hasMany: any;
}

interface IBelongTo {
  belongTo: any;
}