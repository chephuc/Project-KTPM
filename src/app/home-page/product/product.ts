export interface Product{
    idShoes: string;
    ShoesImg: string;
    ShoesName: string;
    ShoesPrice: number;
    ShoesColor: string;
    idtype: string;
    idcategory: string;
}

export interface Size{
    idSize: number;
    Size: string;
}

export interface Type{
    idtype: number;
    typeName: string;
}

export interface Detail{
    ShoesName: string;
    idShoes: string;
    Size: string;
    idOrder: number;
    idSize: string
}
 
