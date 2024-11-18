import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

const NewMeetup = () => {
    const router = useRouter();
    const addMeetupHandler = async (data) => {
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();
        console.log(json);
        router.push('/');
    };
    
    return <>
        <Head>
            <title>React new meetup</title>
            <meta name="description" content="some content" />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
};

export default NewMeetup;