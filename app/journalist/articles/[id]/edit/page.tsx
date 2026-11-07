import ArticleForm from "../../../../components/articles/article-form";
import type { ComponentType } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const EditArticleForm = ArticleForm as ComponentType<{
    mode: "edit";
    articleId: string;
  }>;

  return <EditArticleForm mode="edit" articleId={id} />;
}