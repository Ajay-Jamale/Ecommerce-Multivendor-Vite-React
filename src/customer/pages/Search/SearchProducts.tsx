import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
import ProductCard from "../Products/ProductCard/ProductCard";
import { CircularProgress } from "@mui/material";

const SearchProducts = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  // Auto search when query changes
  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProduct(query));
    }
  }, [query, dispatch]);

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-20 py-10">

      {/* Page Title */}
      {query && (
        <h2 className="text-2xl font-semibold mb-8">
          Search Results for:{" "}
          <span className="text-primary-color capitalize">
            {query}
          </span>
        </h2>
      )}

      {/* Loading State */}
      {products.loading ? (
        <div className="h-[60vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : query.trim() === "" ? (
        <div className="h-[60vh] flex justify-center items-center">
          <h2 className="text-xl text-gray-600">
            Start searching from the navigation bar
          </h2>
        </div>
      ) : products.searchProduct?.length > 0 ? (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.searchProduct.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <div className="h-[60vh] flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">
            Try searching with a different keyword
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
