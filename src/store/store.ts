import { createEvent, createStore } from "effector";

import { StoreTypes, ArticleTypes, FilterTypes } from "../types/types";

const addArticleToArticles = (
  articles: ArticleTypes[],
  title: string,
  theme: string,
  content: string,
  author: string,
  date: string
): ArticleTypes[] => [
  ...articles,
  {
    id: articles.length,
    comment: [""],
    commentText: "",
    title,
    theme,
    content,
    author,
    date,
    isVisible: true,
    ascending: undefined,
  },
];

const removeArticle = (
  articles: ArticleTypes[],
  removedArticle: number
): ArticleTypes[] => {
  articles.splice(removedArticle, 1);
  return articles;
};

const editArticle = (
  articles: ArticleTypes[],
  mutableArticle: number,
  author: string,
  title: string,
  theme: string,
  content: string,
  date: string
): ArticleTypes[] => {
  articles[mutableArticle].title = title;
  articles[mutableArticle].theme = theme;
  articles[mutableArticle].content = content;
  articles[mutableArticle].author = author;
  articles[mutableArticle].date = date;

  return articles;
};

const commentArticle = (
  articles: ArticleTypes[],
  commentedArticle: number,
  comment: string
): ArticleTypes[] => {
  articles[commentedArticle].comment.push(comment);
  return articles;
};

const sortOfDate = (
  articles: ArticleTypes[],
  type?: string
): ArticleTypes[] => {
  if (type === "default") {
    return articles.sort((itemX: ArticleTypes, itemY: ArticleTypes): number => {
      if (itemX.id > itemY.id) {
        return 1;
      }
      if (itemX.id < itemY.id) {
        return -1;
      }
      return 0;
    });
  } else {
    return articles.sort((itemX: ArticleTypes, itemY: ArticleTypes): number => {
      if (
        type === "ascending" ? itemX.date > itemY.date : itemX.date < itemY.date
      ) {
        return 1;
      }
      if (
        type === "ascending" ? itemX.date < itemY.date : itemX.date > itemY.date
      ) {
        return -1;
      }
      return 0;
    });
  }
};

const setNewArticle = createEvent<ArticleTypes>();
const addArticle = createEvent();
const remove = createEvent<number>();
const update = createEvent<ArticleTypes>();
const comment = createEvent<ArticleTypes>();
const sort = createEvent<string>();

const store = createStore<StoreTypes>({
  articles: [],
  title: "",
  theme: "",
  content: "",
  filters: {
    Author: [],
    Theme: [],
  },
  author: "",
  date: "",
})
  .on(setNewArticle, (state, { id, title, theme, content, author, date }) => ({
    ...state,
    id: id,
    comment: "",
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
      state.date
    ),
  }))
  .on(remove, (state, removedArticle) => ({
    ...state,
    articles: removeArticle(state.articles, removedArticle),
  }))
  .on(update, (state, { id, author, title, theme, content, date }) => ({
    ...state,
    articles: editArticle(
      state.articles,
      id,
      author,
      title,
      theme,
      content,
      date
    ),
  }))
  .on(comment, (state, { id, commentText }) => ({
    ...state,
    articles: commentArticle(state.articles, id, commentText),
  }))
  .on(sort, (state, ascending) => ({
    ...state,
    articles: sortOfDate(state.articles, ascending),
  }));

export default store;
export { setNewArticle, addArticle, remove, update, comment, sort };
