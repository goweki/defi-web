import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const doc = await request.json();
    console.log(
      `POST REQUEST: to add a new product. \n >> ${JSON.stringify(
        doc
      )}\n..........................`
    );
    // target COLLECTION
    const client = await clientPromise;
    const collection = client.db(process.env.ATLAS_DB).collection("products");
    // insert DOC
    const res_ = await collection.insertOne(doc);
    console.log(
      `SUCCESS: A document was inserted. \n >> ${JSON.stringify(
        res_
      )}\n.........................`
    );
    // HTTP response
    return Response.json({ success: "Document saved" });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route\n >> ${JSON.stringify(
        error.error || error
      )}\n.........................`
    );
    return Response.json({ error: "Document was not saved" });
  }
}
