import React from "react";

export default function Paginado({ itemsPerPage, allItems, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <a onClick={() => paginado (number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
