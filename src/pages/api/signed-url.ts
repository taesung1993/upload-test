// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

type Data = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileName = req.query.fileName as string;
  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream",
  };

  const [url] = await storage
    .bucket(process.env.NEXT_PUBLIC_GCO_BUCKET_NAME!)
    .file(fileName)
    .getSignedUrl(options);

  res.status(200).json({ url });
}
