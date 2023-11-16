import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export const revalidate = 0; // false | 'force-cache' | 0 | number

export async function GET(request) {
  try {
    console.log(`GET REQUEST: all blog-posts.\n..........................`);
    // target COLLECTION
    const client = await clientPromise;
    const collection = client.db(process.env.ATLAS_DB).collection("blogposts");
    // find DOCs
    const res_ = await collection.find({}).toArray();
    console.log(`SUCCESS: Docs fetched in array \n........................`);
    // parse timestamp
    const res = res_.map((element) => ({
      ...element,
      date: new ObjectId(element._id).getTimestamp().toDateString(),
    }));
    // // HTTP response
    // console.log(
    //   `Timetamp for element 1: \n >> ${new ObjectId(res_[0]._id)
    //     .getTimestamp()
    //     .toDateString()}\n......................`
    // );
    return Response.json({
      success: res,
    });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route\n >> ${JSON.stringify(
        error.error || error
      )}\n......................`
    );
    return Response.json({
      error: "Could not acquire blog posts",
    });
  }
}
