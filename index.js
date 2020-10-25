const app = require("./src/app")()
require("./src/model/index")

const port = 3000;
app.listen(port, () => {
    console.log(`Server start at port: ${port}`);
})