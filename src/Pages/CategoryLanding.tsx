import { Link, useParams } from '@tanstack/react-router';
import { getCategoryBySlug } from '../lib/catalog';

export const CategoryLanding = () => {
  const { categorySlug = '' } = useParams({ from: '/category/$categorySlug' });
  const category = getCategoryBySlug(categorySlug);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-4 py-16">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6347]">
        Category
      </span>
      <h1 className="mt-4 text-4xl font-bold text-gray-900">{category.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
        {category.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-lg bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
        >
          Back to homepage
        </Link>
        <Link
          to="/FAQ"
          className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 transition-colors hover:border-gray-500"
        >
          Ask a question
        </Link>
      </div>
    </section>
  );
};
