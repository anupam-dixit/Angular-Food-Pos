const ENDPOINT= 'http://localhost:3000/'
export const Endpoints={
  ENDPOINT: 'http://localhost:3000/',
  User:{
    Login:ENDPOINT+'users/login'
  },
  File:{
    Upload:ENDPOINT+'file/upload',
    UpdateById:ENDPOINT+'file/update-by-id',
  },
  Category:{
    List:ENDPOINT+'category',
    Dtlist:ENDPOINT+'category/dt',
    Create:ENDPOINT+'category/create',
    Update:ENDPOINT+'category/update',
    Delete:ENDPOINT+'category/delete'
  },
  SubCategory:{
    List:ENDPOINT+'sub-category',
    Dtlist:ENDPOINT+'sub-category/dt',
    Create:ENDPOINT+'sub-category/create',
    Update:ENDPOINT+'sub-category/update',
    Delete:ENDPOINT+'sub-category/delete'
  },
}
