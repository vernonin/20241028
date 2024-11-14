import { PdfEditer } from "../components"


if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== 'undefined') {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  } else {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    global.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }
}


function HomeTitle() {
  return (
    <div>
      <h1 className="text-4xl text-center mb-8">Rotate PDF Pages</h1>
      <p className="max-w-lg text-center text-gray-500">Simply click on a page to rotate it. You can then download your modified PDF.</p>
    </div>
  )
}

function Home() {
  return (
    <div className="flex flex-col items-center py-20 space-y-6 bg-[rgb(247,245,238)]">
      <HomeTitle />
      <PdfEditer />
    </div>
  );
}

export default Home;