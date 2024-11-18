import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://www.meetup.com/blog/wp-content/uploads/2022/05/option-1.jpg',
    address: 'Some address',
    description: 'This is the first meetup'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://www.meetup.com/blog/wp-content/uploads/2022/05/option-1.jpg',
    address: 'Some address 2',
    description: 'This is the second meetup'
  }
]

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="some content" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://pab:29x5pbl0w24CBw7l@cluster0.n2nvd.mongodb.net/test?retryWrites=true&w=majority',
      {
        serverSelectionTimeoutMS: 15000,
      }
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    
    client.close();
  
    return {
      props: {
        meetups: meetups.map((meetup) => ({
          id: meetup._id.toString(),
          image: meetup.image,
          title: meetup.title,
          address: meetup.address,
          description: meetup.description,
        })),
      },
      revalidate: 10 //every ten sec regenerate page
    }
  } catch(e) {
    console.log(e);
  }

  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10 //every ten sec regenerate page
  }
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;

//   //fetch data
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   }
// }
