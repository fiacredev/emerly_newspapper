import ArticleForm from "../../../components/articles/article-form";

export default function CreateArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Create article
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Write, organize and prepare your next publication.
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}