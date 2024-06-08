import axios from "axios";
import pako from "pako";

const compressFile = async (file: File): Promise<Blob> => {
  const arrayBuffer = await file.arrayBuffer();
  const compressed = pako.gzip(new Uint8Array(arrayBuffer));
  return new Blob([compressed], { type: "application/gzip" });
};

export default function Home() {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const {
          data: { url },
        } = await axios.get("/api/signed-url", {
          params: {
            fileName: file.name,
          },
        });
        const { data } = await axios.put(
          url.replace("https://storage.googleapis.com", "/api/gcp"),
          file,
          {
            headers: {
              "Content-Type": "application/octet-stream",
            },
          }
        );

        await axios.post("/api/private", {
          fileName: file.name,
        });

        alert("성공");
      } catch (error) {
        console.log(error);
        alert("실패");
      }
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <input type="file" onChange={onChange} />
    </main>
  );
}
