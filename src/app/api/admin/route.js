import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const doc = await request.json();
    console.log(
      `POST REQUEST: to add a new product. \n >> \n..........................`
    );
    // target COLLECTION
    console.log(
      `CHECKPOINT: connecting to data source\n >> \n.........................`
    );
    const client = await clientPromise;
    console.log(
      `CHECKPOINT: selecting collection\n >> \n.........................`
    );
    const collection = client.db(process.env.ATLAS_DB).collection("products");
    // insert DOC
    console.log(`CHECKPOINT: inserting doc\n >> \n.........................`);
    const res_ = await collection.insertOne(doc);
    console.log(`SUCCESS: A document was inserted.\n.........................`);
    // HTTP response
    return Response.json({ success: "Document saved" });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route admin65276\n >> ${
        error.error || error
      }\n.........................`
    );
    return Response.json({ error: "Document was not saved" });
  }
}
