import type { VercelRequest, VercelResponse } from '@vercel/node';

let messages: string[] = []; // Message store

export default function (_req: VercelRequest, res: VercelResponse) {
  console.log("Messages: ", messages);
  res.status(200).json(messages);
}
