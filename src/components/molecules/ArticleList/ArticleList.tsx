import Article from "../Article/Article";
import Paper from "../../atoms/Paper/Paper";

type ArticleProps = {
  comment?: string[] | string;
  title: string;
  theme: string;
  content: string;
  author: string;
  date: string;
};

type ArticleListProps = {
  data: ArticleProps[];
};

const ArticleList = ({ data }: ArticleListProps) => {
  return (   
    <div>
      {data.map((article, _index) => {
        return (
          <Paper top={{ all: _index !== 0 ? 20 : 0 }} key={_index}>
            <Article
              id={_index}
              title={article.title}
              theme={article.theme}
              content={article.content}
              author={article.author}
              date={article.date}
              key={_index}
            />
          </Paper>
        );
      })}
    </div>
  );
};

export default ArticleList;
