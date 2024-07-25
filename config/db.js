const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
 
  try {
    mongoose.connect(process.env.MONGODB_URL)
    const db=mongoose.connection
    db.once('open',()=>{
        console.log('connected to database')
    })

} catch (err) {
  console.log(err)
}
};

module.exports = connectDB;
