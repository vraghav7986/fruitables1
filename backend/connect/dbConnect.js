import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://kk:kk@cluster0.b0ampyb.mongodb.net/kk");
    console.log("Data base is Connected.");
  } catch (error) { 
    console.log(error.message);
  }
};

export default dbConnect;
