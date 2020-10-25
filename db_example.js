const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const catSchema = { name: String };
const Cat = mongoose.model('Child', catSchema);
const kitty = new Cat({ name: 'Zildjian' });

(async () => {
    const { _id } = await kitty.save();
    // const findResult = await Cat.findOne({ _id: new mongoose.Types.ObjectId(_id) });
    // const cat = new Cat(findResult);
    // cat.name = "Kitty";
    // Object.assign(cat, { name: "Kitty" });
    // await cat.save();

    await Cat.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, { $set: { name: "Kitty" } });

    const newResult = await Cat.findOne({ _id: new mongoose.Types.ObjectId(_id) });
    // console.log(findResult);
    console.log(newResult);

    await Cat.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
})()


