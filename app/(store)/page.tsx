import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {

  
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //     `>>> Rendered the home page cache w/ ${products.length} products and ${categories.length} categories`
  // );

  return (
    <div className="">
      <BlackFridayBanner />
      {/*  Render products */}
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
