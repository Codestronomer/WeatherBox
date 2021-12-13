console.log("Starting app")

setTimeout(() => {
    console.log("Inside of callback")
}, 2000)

setTimeout(() => {
    console.log("Second setTimeout work")
})
console.log("finishing app")