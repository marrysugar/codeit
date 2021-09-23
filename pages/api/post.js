import { connectToDatabase } from "../../utils/mongodb"
import { ObjectId } from 'mongodb';

const createPost = async (req, res) => {
  const {db} = await connectToDatabase()
  const {title, body, group} = req.body
  const cookies = req.cookies

  if (!title || !body || !group) {
    return res.status(300).json()
  }

  const newPost = {
    title: title,
    body: body,
    groupId: group,
    createdBy: cookies.codeItId,
    createdOn: Date.now(),
    votesUp: [cookies.codeItId],
    votesDown: []
  }

  await db.collection("post").insertOne(newPost)

  return res.status(200).json({...newPost})
}

const editPost = async (req, res) => {
  const {db} = await connectToDatabase()
  const {id, body} = req.body

  if (!id) {
    return res.status(300).json()
  }

  const result = await db.collection("post").updateOne({'_id': new  ObjectId(id)},{$set: {body: body}})

  return res.status(200).json(result)
}

const getPost = async (req, res) => {
  const {db} = await connectToDatabase()
  const {id} = req.query

  if (!id) {
    return res.status(300).json()
  }

  const result = await db.collection("post").findOne({ '_id': new  ObjectId(id) })

  return res.status(200).json(result)
}

export default async (req, res) => {
  switch(req.method) {
    case "POST":
      return await createPost(req, res)
    case "PUT":
      return await editPost(req, res)
    case "GET":
      return await getPost(req, res)
    default:
      return res.status(404).json()
  }
}