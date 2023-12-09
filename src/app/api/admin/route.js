import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export const revalidate = 0; // false | 'force-cache' | 0 | number

export async function POST(request) {
  try {
    const doc = await request.json();
    const { colle_, ...doc_ } = doc;
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
    const collection = client.db(process.env.ATLAS_DB).collection(colle_);
    // insert DOC
    console.log(`CHECKPOINT: inserting doc\n >> \n.........................`);
    const res_ = await collection.insertOne(doc_);
    console.log(`SUCCESS: A document was inserted.\n.........................`);
    // HTTP response
    return Response.json({ success: res_ });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route admin -POST\n >> ${
        error.error || error
      }\n.........................`
    );
    return Response.json({ error: "Document was not saved" });
  }
}

export async function PUT(request) {
  try {
    const doc = await request.json();
    const { _id, colle_, ...doc_ } = doc;
    console.log(
      `PUT REQUEST: to update product. \n >> \n..........................`
    );
    // target COLLECTION
    console.log(
      `CHECKPOINT: connecting to data source\n >> \n......................`
    );
    const client = await clientPromise;
    console.log(
      `CHECKPOINT: selecting collection\n >> \n.....................`
    );
    const collection = client.db(process.env.ATLAS_DB).collection(colle_);
    // update DOC
    console.log(
      `CHECKPOINT: updating doc\n >> _id: ${_id}\n >> fields: ${Object.keys(
        doc_
      )}\n..................`
    );
    collection.updateOne({ _id: new ObjectId(_id) }, { $set: { ...doc_ } });
    console.log(`SUCCESS: A document was updated.\n.........................`);
    // HTTP response
    return Response.json({ success: "Document updated" });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route admin -PUT2\n >> ${
        error.error || error
      }\n.........................`
    );
    return Response.json({ error: "Document was not updated" });
  }
}

export async function DELETE(request) {
  try {
    const doc = await request.json();
    const { _id, colle_ } = doc;
    console.log(
      `DELETE REQUEST: to delete a document. \n >> \n..........................`
    );
    // target COLLECTION
    console.log(
      `CHECKPOINT: connecting to data source\n >> \n......................`
    );
    const client = await clientPromise;
    console.log(
      `CHECKPOINT: selecting collection\n >> \n.....................`
    );
    const collection = client.db(process.env.ATLAS_DB).collection(colle_);
    // delete DOC
    console.log(
      `CHECKPOINT: deleting doc\n >> _id: ${_id}\n..................`
    );
    const result = await collection.deleteOne({ _id: new ObjectId(_id) });
    // HTTP response
    console.log(`CHECKPOINT: result ${JSON.stringify(result)}\n...........`);
    if (result.deletedCount === 1) {
      console.log(
        `SUCCESS: A document was deleted.\n.........................`
      );
      return Response.json({ success: "Document deleted" });
    } else {
      console.log("No document was deleted.");
      return Response.json({ error: "Document was not deleted.." });
    }
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in route admin -DELETE\n >> ${
        error.error || error
      }\n.........................`
    );
    return Response.json({ error: "Document was not deleted." });
  }
}
