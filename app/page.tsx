import { PdfEditer } from "../components"

function HomeTitle() {
  return (
    <div>
      <h1 className="text-4xl text-center mb-8">Rotate PDF Pages</h1>
      <p className="max-w-lg text-center text-gray-500">Simply click on a page to rotate it. You can then download your modified PDF.</p>
    </div>
  )
}



export default function Home() {
  return (
    <div className="flex flex-col items-center py-20 space-y-6 bg-[rgb(247,245,238)]">
      <HomeTitle />
      <PdfEditer/>
    </div>
  );
}
