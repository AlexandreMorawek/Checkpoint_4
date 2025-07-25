import { useParams } from "react-router-dom";
import ArticleDetails from "./ArticleDetail";

function ArticleDetailsWrapper() {
  const { id } = useParams();

  return <ArticleDetails key={id} />;
}

export default ArticleDetailsWrapper;
