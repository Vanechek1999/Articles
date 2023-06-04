import { createEvent, createStore } from "effector";

type Article = {
  id: number;
  comment: string[];
  commentText: string,
  title: string;
  theme: string;
  content: string;
  author: string;
  date: string;
};

type Store = {
  articles: Article[];
  title: string;
  theme: string;
  content: string;
  author: string;
  date: string;
};

const addArticleToArticles = (
  articles: Article[],
  title: string,
  theme: string,
  content: string,
  author: string,
  date: string,
): Article[] => [
  ...articles,
  {
    id: articles.length,
    comment: [''],
    commentText: '',
    title,
    theme,
    content,
    author,
    date,
  },
];

const removeArticle = (
  articles: Article[],
  removedArticle: number
): Article[] => {
  articles.splice(removedArticle, 1);
  return articles;
};

const editArticle = (
  articles: Article[],
  mutableArticle: number,
  author: string,
  title: string,
  theme: string,
  content: string,
  date: string
): Article[] => {
  articles[mutableArticle].title = title;
  articles[mutableArticle].theme = theme;
  articles[mutableArticle].content = content;
  articles[mutableArticle].author = author;
  articles[mutableArticle].date = date;

  return articles
};

const commentArticle = (articles: Article[], commentedArticle: number, comment: string): Article[] => {
  articles[commentedArticle].comment.push(comment)

  return articles
}

const setNewArticle = createEvent<Article>();
const addArticle = createEvent();
const remove = createEvent<number>();
const update = createEvent<Article>()
const comment = createEvent<Article>()

const store = createStore<Store>({
  articles: [],
  title: "",
  theme: "",
  content: "",
  author: "",
  date: "",
})
  .on(setNewArticle, (state, { id, title, theme, content, author, date }) => ({
    ...state,
    id: id,
    comment: '',
    title: title,
    theme: theme,
    content: content,
    author: author,
    date: date,
  }))
  .on(addArticle, (state) => ({
    ...state,
    articles: addArticleToArticles(
      state.articles,
      state.title,
      state.theme,
      state.content,
      state.author,
      state.date,
    ),
  }))
  .on(remove, (state, removedArticle) => ({
    ...state,
    articles: removeArticle(state.articles, removedArticle),
  }))
  .on(update, (state, {id, author, title, theme, content, date}) => ({
    ...state,
    articles: editArticle(state.articles, id, author, title, theme, content, date)
  }))
  .on(comment, (state, {id, commentText}) => ({
    ...state,
    articles: commentArticle(state.articles, id, commentText)
  }))

export default store;
export { setNewArticle, addArticle, remove, update, comment };
