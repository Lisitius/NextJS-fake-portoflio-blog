import Link from "next/link";
import Meta from "../../components/Meta";

const article = ({ article }) => {
  return (
    <div className="article-page">
      <Meta title={article.title} />
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <Link href="/">Revenir à la page Acceuil</Link>
    </div>
  );
};

export default article;

export const getStaticProps = async (context) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + context.params.id
  );
  const article = await res.json();
  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const articles = await res.json();
  // Prepare id in object path {id:1, id:2}
  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
