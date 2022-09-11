export const validateNewPrice = (price:number):string  =>  {
  if(price <=0) {
    return 'New price should be greater then 0'
  }
  if( price >= 100000000) {
    return 'Product price should be less then 1B due to tax limitations'
  }
  return ''
}