import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <section className="">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <Link
          rel="noopener noreferrer"
          href="#"
          className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 border rounded-md"
        >
          <img
            src="https://www.datocms-assets.com/48401/1628644950-javascript.png"
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 "
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              Noster tincidunt reprimique ad pro
            </h3>
            <span className="text-xs dark:text-gray-600">
              February 19, 2021
            </span>
            <p>
              Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est in
              graece fuisset, eos affert putent doctus id.
            </p>
          </div>
        </Link>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            rel="noopener noreferrer"
            href="#"
            className="max-w-sm mx-auto group hover:no-underline focus:no-underline border rounded-md"
          >
            <img
              role="presentation"
              className="object-cover w-full rounded h-44 dark:bg-gray-500"
              src="https://cyberhoot.com/wp-content/uploads/2020/07/Free-Courses-to-learn-JavaScript-1024x576.jpg"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                In usu laoreet repudiare legendos
              </h3>
              <span className="text-xs dark:text-gray-600">
                January 21, 2021
              </span>
              <p>
                Mei ex aliquid eleifend forensibus, quo ad dicta apeirian
                neglegentur, ex has tantas percipit perfecto. At per tempor
                albucius perfecto, ei probatus consulatu patrioque mea, ei
                vocent delicata indoctum pri.
              </p>
            </div>
          </Link>
        </div>
        <div className="flex justify-center">{/* Pagination Here */}</div>
      </div>
    </section>
  );
};

export default BlogPage;
