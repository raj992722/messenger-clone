import getConversationId from "@/app/actions/getConversationId";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import { useParams } from "next/navigation";
import Header from "./components/Header";
import Body from "./components/Body";
// import { Form } from "react-hook-form";
import Form from './components/Form';

interface IParams {
    conversationId: string;
}

const Page =async  ({params}:{params:IParams}) => {
    const { conversationId } =await params;
    const conversation = await getConversationId(conversationId);
    console.log(conversation);
    const messages = await getMessages(conversationId);
    console.log(messages);
    if(!conversation){
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col ">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col justify-between">
                <Header conversation = {conversation} />
                <Body initialMessages={messages!}/>
                <Form />
            </div>
           
        </div>
    );
};

export default Page;
 
//  The  useParams  hook is used to get the URL parameters. In this case, we are getting the conversationId from the URL. 
//  The  conversationId  is then used to display the conversation ID on the page. 
//  The URL parameters are accessed using the  useParams  hook. 
//  The  useParams  hook is a part of the  react-router-dom  package