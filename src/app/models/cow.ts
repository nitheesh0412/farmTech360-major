export interface ICow{
  id : string,
  sex : string,
  age : number

}

export interface IUpdateCow{
  ids : string,
  vaccine_name : string,
  doses : string,
  date : Date,
  status : string
}
export interface dates{
  date : Date,
  check : string
}
export interface IVaccine{
  id : string,
  vaccine_name : string,
  doses : number,
  timeinterval : number
  status : Array<dates>
}