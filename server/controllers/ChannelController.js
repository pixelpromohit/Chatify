import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (request, response, next) => {
    try { 
        const {name, members} = request.body
        const userId = request.userId

        const admin = await User.findById(userId)

        if (!admin) {
            return response.status(400).send("Admin user not found.")
        }

        const validMembers = await User.find({_id:{$in:members}})

        if (validMembers.length !== members.length) {
            return response.status(400).send("Some members are not valid users.")
        }

        const newChannel = new Channel({
            name,
            members,
            admin:userId,
        })

        await newChannel.save()
        return response.status(201).json({channel : newChannel})

    } catch (error) {
      console.log({ error });
      return response.status(500).send("Internal Server Error.");
    }
};

export const getUserChannels = async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.userId);
      const channels = await Channel.find({
        $or: [{ admin: userId }, { members: userId }],
      }).sort({ updatedAt: -1 });
  
      return res.status(200).json({ channels });
    } catch (error) {
      console.error("Error getting user channels:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };