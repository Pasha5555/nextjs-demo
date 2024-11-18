import { MongoClient } from "mongodb";


async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await MongoClient.connect('mongodb+srv://pab:29x5pbl0w24CBw7l@cluster0.n2nvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');    // const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const meetups = await meetupsCollection.find().toArray();

            client.close();
            res.status(201).json({meetups});
        } catch(e) {
            console.log(e);
        }
    }
}

export default handler;