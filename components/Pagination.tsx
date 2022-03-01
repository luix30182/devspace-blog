import Link from 'next/link';

export default function Pagination({ currentpage, numPages }) {
  const isFirst = currentpage === 1;
  const isLast = currentpage === numPages;
  const prevPage = `/blog/page/${currentpage - 1}`;
  const nextPage = `/blog/page/${currentpage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirst && (
          <Link href={prevPage} passHref={true}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Previous
            </li>
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} passHref={true}>
            <li
              key={i}
              className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
            >
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage} passHref={true}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
