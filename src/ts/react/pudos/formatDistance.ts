export default (x: number) => {
  if (x < 1) { return Math.floor(x * 1000) + ' m' }
   return Math.floor(x * 10) / 10 + ' km'
}
