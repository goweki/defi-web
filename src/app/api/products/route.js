import clientPromise from "@/lib/mongodb";
export const revalidate = 6; // false | 'force-cache' | 0 | number

export async function GET(request) {
  try {
    console.log(`GET REQUEST: all products.\n..........................`);
    // target COLLECTION
    const client = await clientPromise;
    const collection = client.db(process.env.ATLAS_DB).collection("products");
    // find DOCs
    const res_ = await collection.find({}).toArray();
    console.log(`SUCCESS: Docs fetched in array \n........................`);
    // HTTP response
    return Response.json({ success: res_ });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route\n >> ${JSON.stringify(
        error.error || error
      )}\n......................`
    );
    return Response.json({
      error: "Could not acquire product catalogue",
    });
  }
}
