import ErrorMessage from "./components/errorMessage"
import FeedCard from "./components/feed/Card"
import { cookies } from "next/headers"
import { verifyToken } from "@/utils/jwt"



async function getFeed() {
  const cookieStore = cookies()
  const access_token = cookieStore.get("access_token")
  const access_token_data = await verifyToken(access_token.value)

  // CURRENT USER'S ID
  const curr_user_id = access_token_data?.user_id

  console.log(curr_user_id)
  if(!curr_user_id) return console.log("Error: failed loading feed bc user_id ")

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/view/posts/${curr_user_id}`, {
    method: "GET",
  })

  return res.json()
}

// export default async function Home() {
//   const feed = await getFeed()
//   var json = JSON.stringify(feed)
//   json = JSON.parse(json)
//   console.log(json)





//   // return (
//   //   <div className="w-full">
//   //     <h1 className="text-2xl mb-8">Feed</h1>
//   //     {feed.Tasks ? (
//   //       Object.entries(feed.Tasks).map(([key, value]) => (
//   //         <div key={key}>
//   //           <FeedCard task_id={key} task_data={value} />
//   //         </div>
//   //       ))
//   //     ) : (
//   //       <ErrorMessage message="Error: failed loading feed" />
//   //     )}
//   //   </div>
//   // )

//   return (
//     // <div className="w-full">
//     //   <h1 className="text-2xl mb-8">Feed</h1>
//     //    {feed && feed.length > 0 ? (
//     //     feed.map((post, index) => (
//     //       <div key={index}>
//     //         {/* Assuming post_id is present in each post object */}
//     //         <FeedCard post_id={post.post_id} post_data={post} />
//     //       </div>
//     //     ))
//     //   ) : (
//     //     <ErrorMessage message="Error: failed loading feed" />
//     //   )}
//     // </div>
//     <div className="w-full">
//       <h1 className="text-2xl mb-8">Feed</h1>
//         <h2>{json.content}</h2>
//     </div>
      
      
    
//   );
  
// }
export default async function Home() {
  const feed = await getFeed();
  
  // Check if feed exists and has at least one item
  if (feed && Object.keys(feed).length > 0) {
    // Get the first key from the feed object
    const feedKeys = Object.keys(feed);
    const firstFeedKey = feedKeys[0];
    
    // Access the content property of the first object in the feed object
    const content = feed[firstFeedKey].content;
    console.log(content); // Output the content
    
    return (
      <div className="w-full">
        <h1 className="text-2xl mb-8">Feed</h1>
        {Object.entries(feed).map(([key, value]) => (
          <div key={key}>
            <FeedCard post_id={key} post_data={value} />
          </div>
        ))}
      </div>
    );
  } else {
    return <ErrorMessage message="Error: failed loading feed" />;
  }
}
