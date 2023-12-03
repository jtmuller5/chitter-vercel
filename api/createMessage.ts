import type { VercelRequest, VercelResponse } from '@vercel/node';

let messages: string[] = []; // Message store

export default function (req: VercelRequest, res: VercelResponse) {
  const { message } = req.body;
  console.log("New message: ", message);
  if (!message) {
    res.status(400).send("No message provided");
    return;
  }
  messages.push(message);
  res.status(201).send(`Message added successfully`);
}
