import {
  getAllRecipies,
  getAllRecipyById,
} from "@/app/data-access-layer/recipyDAL";
import ErrorPage from "@/app/[lang]/error";
import { getDictionary } from "@/app/[lang]/dictionaries";
import RecipeDetails from "@/app/ui/RecipiesDetailes";
import { getSession } from "@/app/lib/session";
import Carousel from "@/app/ui/Carousel/Carousel";
import { EmptyState } from "@/app/ui/EmptyState";
import { carouselDictionary } from "@/app/ui/Carousel/carouselTypes";
export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ recipeId: string; lang: string }>;
}) {
  const { recipeId, lang } = await params;
  const t = await getDictionary(lang);
  const recipe = await getAllRecipyById(recipeId, lang);
  const recipes = await getAllRecipies(lang);
  const result = await getSession();

  if (recipe.status === 500) {
    return (
      <ErrorPage
        error={new Error(lang === "en" ? recipe.messageEn : recipe.messageAr)}
      />
    );
  }
  if (recipes.status === 500) {
    return (
      <ErrorPage
        error={new Error(lang === "en" ? recipes.messageEn : recipes.messageAr)}
      />
    );
  }
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#ffd597] before:absolute before:top-0 before:block before:h-full before:w-full before:bg-[#e6b56c4d] before:mask-[url(/pattern2.svg)] before:mask-cover before:mask-center before:content-['']">
      {recipes.recipies.length === 0 || !recipe ? (
        <>
          <EmptyState noItems={t.recipesWrapper.NotFound} lang={lang} />
        </>
      ) : (
        <>
          <div className="z-[0] flex w-full max-w-7xl flex-col items-center justify-center gap-[100px] overflow-x-hidden px-2 py-[100px] sm:gap-[calc(var(--spacing)_*_40)] sm:py-40">
            <RecipeDetails
              recipe={recipe.recipie}
              lang={lang}
              t={
                t as {
                  ProdsWrapper: {
                    title: string;
                  };
                  recipesWrapper: {
                    NotFound: string;
                    trending: string;
                    view: string;
                    noRecs: string;
                    link: string;
                  };
                }
              }
            />
            <Carousel
              items={recipes.recipies}
              user={result}
              title={t.recipesWrapper.trending}
              all={t.recipesWrapper.view}
              noItems={t.recipesWrapper.noRecs}
              lang={lang}
              t={t as carouselDictionary}
              type="recipes"
              linkPrefix={`/${lang}/Recipes`}
              linkText={t.recipesWrapper.link}
              showVotes={true}
            />
          </div>
        </>
      )}
    </main>
  );
}
