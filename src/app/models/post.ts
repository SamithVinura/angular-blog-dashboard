export interface Post {
  title:string,
  permalink:string,
  category:{
    categoryId:string,
    category:string
  },
  postImgPath:string,
  excpert:string,
  content:string,
  isFeatured:boolean,
  views:number,
  status:string,
  createAt:Date

}
