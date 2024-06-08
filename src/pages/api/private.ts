// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

type Data = {
  name: string;
};

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileName = req.body.fileName as string;

  const file = storage
    .bucket(process.env.NEXT_PUBLIC_GCO_BUCKET_NAME!)
    .file(fileName);

  await file.makePrivate();

  res.status(200).json({ name: "John Doe" });
}
