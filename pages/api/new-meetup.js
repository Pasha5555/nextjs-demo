import { MongoClient } from "mongodb";


async function handler(req, res) {
    console.log(req.method);
    const pass = '29x5pbl0w24CBw7l';
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = await MongoClient.connect('mongodb+srv://pab:29x5pbl0w24CBw7l@cluster0.n2nvd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');
            const db = client.db();

            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne(data);

            client.close();
        } catch(e) {
            console.log(e);
        }
        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;