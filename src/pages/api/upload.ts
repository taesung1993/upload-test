// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const router = createRouter<MulterRequest, NextApiResponse>();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
}).single("file");

router.use(upload as any);

router.post(async (req, res) => {
  const originalFile = req.file;

  console.log(originalFile);
  res.status(200).json({ name: "John Doe" });
});

export const config = {
  api: {
    bodyParser: false,
  },
  supportsResponseStreaming: true,
};

export default router.handler({
  onError: (err, req, res) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err.stack);
      res.status(500).end(`Multer error: ${err.message}`);
    } else {
      console.error("Unexpected error:", err);
      res.status(500).end("An unexpected error occurred");
    }
  },
});
