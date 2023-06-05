import { useState, useEffect, useMemo } from "react";
import { useStore } from "effector-react";

import MiniSearch from "minisearch";

import Article from "../Article/Article";
import Paper from "../../atoms/Paper/Paper";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import Input from "../../atoms/Input/Input";

import { ArticleTypes } from "../../../types/types";

import $store, { sort } from "../../../store/store";

import "./ArticleList.scss";

type ArticleListProps = {
  data: ArticleTypes[];
};

type SearchResults = {
  id: number;
};

const ArticleList = ({ data }: ArticleListProps) => {
  const store = useStore($store);
  const [activeTheme, setActiveTheme] = useState("");
  const [activeAuthor, setActiveAuthor] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const getuniqueElements = (initialArray: string[]) =>
    Array.from(new Set(initialArray));
  const filterTheme: string[] = [];
  const filterAuthor: string[] = [];

  
  const resetFilters = () => {
    setActiveAuthor("");
    setActiveTheme("");
    sort("default");
  };

  const searchArticle = (
    fields: string[],
    storeFields: string[],
    array: ArticleTypes[],
    inputValue: string
  ) => {
    const miniSearch = new MiniSearch({
      fields,
      storeFields,
    });

    miniSearch.addAll(array);

    return miniSearch.search(inputValue, { prefix: true, fuzzy: true });
  };

  useMemo(() => {
    data.map((article, _index) => {
      filterTheme.push(article.theme);
      filterAuthor.push(article.author);
      if (_index === data.length - 1) {
        const uniqueAuthors = getuniqueElements(filterAuthor);
        const uniqueTheme = getuniqueElements(filterTheme);

        store.filters?.["Author"].push(...uniqueAuthors);
        store.filters?.["Theme"].push(...uniqueTheme);
      }
    });
  }, [data]);

  useEffect(() => {
    const listThemes = document.querySelectorAll(".ArticleList-Theme");
    const listAuthors = document.querySelectorAll(".ArticleList-Author");
    listThemes.forEach((theme) => {
      theme.addEventListener("click", () => {
        setActiveTheme(theme.innerHTML);
      });
    });
    listAuthors.forEach((author) => {
      author.addEventListener("click", () => {
        setActiveAuthor(author.innerHTML);
      });
    });
  });

  useMemo(() => {
    store.articles.map((article) => {
      if (activeAuthor && article.author !== activeAuthor) {
        article.isVisible = false;
      } else if (activeTheme && article.theme !== activeTheme) {
        article.isVisible = false;
      } else {
        article.isVisible = true;
      }
    });
  }, [filterAuthor, filterTheme]);

  useMemo(() => {
    const results = searchArticle(
      ["title", "theme"],
      ["id"],
      data,
      searchValue
    );
    if(results.length > 0) {
      store.articles.forEach(article => {
        article.isVisible = false
      })
      results.forEach(result => {
        store.articles[result.id].isVisible = true
      })
    }
  }, [searchValue]);

  return (
    <div>
      <Card>
        <Paper>
          <Input
            className="ArticleList-SearchArticle"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Найти статью"
          />
        </Paper>
        <Paper>
          <Paper>
            <Button>
              <Typography>{activeTheme ? activeTheme : "Тема"}</Typography>
            </Button>
            <ul className="ArticleList-FilterList">
              {store.filters?.["Theme"].map((filter) => (
                <li className="ArticleList-Theme">{filter}</li>
              ))}
            </ul>
          </Paper>
          <Paper>
            <Button>
              <Typography>{activeAuthor || "Автор"}</Typography>
            </Button>
            <ul className="ArticleList-FilterList">
              {store.filters?.["Author"].map((filter) => (
                <li className="ArticleList-Author">{filter}</li>
              ))}
            </ul>
          </Paper>
          <Paper>
            <ul className="ArticleList-FilterList">
              <li
                onClick={() => sort("ascending")}
                className="ArticleList-FilterOfAscending"
              >
                По возрастанию
              </li>
              <li
                onClick={() => sort("descending")}
                className="ArticleList-FilterOfDescending"
              >
                По убыванию
              </li>
            </ul>
          </Paper>
        </Paper>
        <Paper>
          <Button
            backGround="blue"
            color="white"
            xSpace={{ all: 20 }}
            ySpace={{ all: 12 }}
            onClick={resetFilters}
          >
            Сбросить фильтры
          </Button>
        </Paper>
      </Card>
      {data.map((article, _index) => {
        return (
          <Paper
            className={!article.isVisible ? "ArticleList-Item_hide" : ""}
            top={{ all: _index !== 0 ? 20 : 0 }}
            key={_index}
          >
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
