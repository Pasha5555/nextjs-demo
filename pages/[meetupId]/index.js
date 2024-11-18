import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";


const MeetupDetails = ({meetup}) => {
    return <MeetupDetail 
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
    />
};

export async function getStaticPaths(context) {
    const client = await MongoClient.connect('mongodb+srv://pab:29x5pbl0w24CBw7l@cluster0.n2nvd.mongodb.net/test?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();

    return {
        fallback: false, //if true - not only supported paths
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() }}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://pab:29x5pbl0w24CBw7l@cluster0.n2nvd.mongodb.net/test?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
    client.close();

    return {
        props: {
            meetup: meetup
        },
        revalidate: 10 //every ten sec regenerate page
    }
}

export default MeetupDetails;