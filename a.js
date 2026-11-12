console.log("1")

Promise.resolve().then(() => {
  console.log("2")
})

setTimeout(() => {
  console.log("3")
}
, 0)

setImmediate(() => {    
  console.log("4")
})

process.nextTick(() => {    
  console.log("5")
}   )

console.log("6")
