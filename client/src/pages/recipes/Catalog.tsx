import { useContext, useEffect } from "react";
import { Link } from "react-router";
import useRecipeAPI from "../../hooks/useRecipeAPI";
import { AuthContext } from "../../context/AuthContext";
import RecipesDefault from "../../components/Recipe";

export default function Catalog() {
  const { user } = useContext(AuthContext);
  const { recipes, fetchAllRecipes } = useRecipeAPI();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="py-16 text-center w-full">
        <h1 className="h1-title">Explore Our Recipe Collection</h1>
        <p className="text-slate-700 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Dive into a world of culinary delights with our extensive collection
          of recipes. Whether you're a beginner or a seasoned chef, you'll find
          something to inspire your next meal.
        </p>
        <Link
          to="/recipes/create"
          className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-3 px-6 rounded-md inline-block mt-8"
        >
          Create Your Own
        </Link>
      </div>

      <section className="text-center w-full py-16 bg-neutral-300 dark:bg-slate-950 flex flex-col items-center flex-grow">
        <h1 className="h1-title">Featured Recipes</h1>
        <div className="flex flex-wrap justify-center gap-6 w-full px-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => {
              const isRecom = recipe.recommendList.includes(user?._id || "");
              return (
                <RecipesDefault
                  key={recipe._id}
                  isRecom={isRecom}
                  {...recipe}
                />
              );
            })
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
              No recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
