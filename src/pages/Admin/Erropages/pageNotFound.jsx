
import { Link } from "react-router-dom";

export default function Example() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-10 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="w-full flex flex-col items-center">
            <img src="favicon.png" alt="" />
            <span className=" ml-2 text-2xl">EduProctor</span>
          </div>
          <div className="errorimg mt-6">
            <img src="../../../404.png" alt="" />
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to="/">
                <button>Go Home</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


// import { Link } from 'react-router-dom';
// import './pageNotFound.scss';

// const PageNotFound = () => {
//   return (
//     <div>

//           <Link to="/">
//             <button>Go Home</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageNotFound;
