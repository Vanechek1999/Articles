import classNames from "classnames";

import { useState, useEffect, useMemo } from "react";
import { useStore } from "effector-react";

import MiniSearch from "minisearch";

import Article from "../Article/Article";
import Paper from "../../atoms/Paper/Paper";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import Input from "../../atoms/Input/Input";
import Width from "../../atoms/Width/Width";
import SvgImage from "../../atoms/SvgImage/SvgImage";

import { ArticleTypes } from "../../../types/types";

import $store, { sort } from "../../../store/store";

import "./ArticleList.scss";

type ArticleListProps = {
  data: ArticleTypes[];
};

const ArticleList = ({ data }: ArticleListProps) => {
  const store = useStore($store);
  const [activeTheme, setActiveTheme] = useState("");
  const [activeAuthor, setActiveAuthor] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showThemes, setShowThemes] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [showDates, setShowDates] = useState(false);

  const getuniqueElements = (initialArray: string[]) =>
    Array.from(new Set(initialArray));
  const filterTheme: string[] = [];
  const filterAuthor: string[] = [];

  const resetFilters = () => {
    setActiveAuthor("");
    setActiveTheme("");
    setActiveDate("");
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
    store.filters?.["Author"].splice(0, store.filters?.["Author"].length);
    store.filters?.["Theme"].splice(0, store.filters?.["Theme"].length);

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
    const sortOfAscending = document.querySelector(".ArticleList-Ascending");
    const sortOfDescending = document.querySelector(".ArticleList-Descending");
    listThemes.forEach((theme) => {
      theme.addEventListener("click", () => {
        setActiveTheme(theme.innerHTML);
        setShowThemes(!showThemes);
      });
    });
    listAuthors.forEach((author) => {
      author.addEventListener("click", () => {
        setActiveAuthor(author.innerHTML);
        setShowAuthors(!showAuthors);
      });
    });
    sortOfAscending?.addEventListener("click", () => {
      setActiveDate(sortOfAscending.innerHTML);
      setShowDates(!showDates);
      sort("ascending");
    });
    sortOfDescending?.addEventListener("click", () => {
      setActiveDate(sortOfDescending.innerHTML);
      setShowDates(!showDates);
      sort("descending");
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
    if (results.length > 0) {
      store.articles.forEach((article) => {
        article.isVisible = false;
      });
      results.forEach((result) => {
        store.articles[result.id].isVisible = true;
      });
    }
  }, [searchValue]);

  return (
    <Paper top={{ all: 20 }} bottom={{ all: 40 }}>
      <Card>
        <Paper>
          <Input
            className="ArticleList-SearchArticle"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Найти статью"
          />
        </Paper>
        <Paper top={{ all: 20 }} bottom={{ all: 40 }}>
          <div className="Article-FiltersModal">
            <Paper
              top={{ desktop: 20 }}
              right={{ all: 12 }}
              bottom={{ all: 20 }}
              left={{ all: 12 }}
            >
              <Paper className="ArticleList-Filters" display="flex">
                <Paper top={{ mobile: 20 }}>
                  <Width
                    className={classNames(
                      "ArticleList-Filter",
                      showThemes && "ArticleList-FilterShowList"
                    )}
                    size={10}
                  >
                    <Button
                      className={classNames(
                        "ArticleList-FilterShowList",
                        showThemes && "ArticleList-FilterShowList_active"
                      )}
                      align="center"
                      display="block"
                      fullWidth
                      borderColor="blue"
                      color="black"
                      ySpace={{ all: 12 }}
                      onClick={() => setShowThemes(!showThemes)}
                    >
                      <div
                        className={classNames(
                          "ArticleFilter-Item",
                          showThemes && "ArticleFilter-Item_active"
                        )}
                      >
                        <Typography weight={500}>
                          {activeTheme || "По теме"}
                        </Typography>
                        <SvgImage type="arrow" size={14} />
                      </div>
                    </Button>
                    <ul
                      className={classNames(
                        "ArticleList-FilterList",
                        showThemes && "ArticleList-FilterList_active"
                      )}
                    >
                      {store.filters?.["Theme"].map((filter) => (
                        <li className="ArticleList-Theme">{filter}</li>
                      ))}
                    </ul>
                  </Width>
                </Paper>
                <Paper top={{ mobile: 20 }}>
                  <Width className="ArticleList-Filter" size={10}>
                    <Button
                      className={classNames(
                        "ArticleList-FilterShowList",
                        showAuthors && "ArticleList-FilterShowList_active"
                      )}
                      borderColor="blue"
                      color="black"
                      fullWidth
                      ySpace={{ all: 12 }}
                      xSpace={{ all: 8 }}
                      onClick={() => setShowAuthors(!showAuthors)}
                    >
                      <div
                        className={classNames(
                          "ArticleFilter-Item",
                          showAuthors && "ArticleFilter-Item_active"
                        )}
                      >
                        <Typography weight={500}>
                          {activeAuthor || "По автору"}
                        </Typography>
                        <SvgImage type="arrow" size={14} />
                      </div>
                    </Button>
                    <ul
                      className={classNames(
                        "ArticleList-FilterList",
                        showAuthors && "ArticleList-FilterList_active"
                      )}
                    >
                      {store.filters?.["Author"].map((filter) => (
                        <li className="ArticleList-Author">{filter}</li>
                      ))}
                    </ul>
                  </Width>
                </Paper>
                <Paper top={{ mobile: 20 }}>
                  <Width className="ArticleList-Filter" size={10}>
                    <Button
                      className={classNames(
                        "ArticleList-FilterShowList",
                        showDates && "ArticleList-FilterShowList_active"
                      )}
                      borderColor="blue"
                      color="black"
                      fullWidth
                      ySpace={{ all: 12 }}
                      onClick={() => setShowDates(!showDates)}
                    >
                      <div
                        className={classNames(
                          "ArticleFilter-Item",
                          showDates && "ArticleFilter-Item_active"
                        )}
                      >
                        <Typography weight={500}>
                          {activeDate || "По дате"}
                        </Typography>
                        <SvgImage type="arrow" size={14} />
                      </div>
                    </Button>
                    <ul
                      className={classNames(
                        "ArticleList-FilterList",
                        showDates && "ArticleList-FilterList_active"
                      )}
                    >
                      <li className="ArticleList-Ascending">По возрастанию</li>
                      <li className="ArticleList-Descending">По убыванию</li>
                    </ul>
                  </Width>
                </Paper>
              </Paper>
              <Paper align="right" top={{ all: 20 }}>
                <Button
                  borderColor="red"
                  color="black"
                  xSpace={{ all: 20 }}
                  ySpace={{ all: 12 }}
                  onClick={resetFilters}
                >
                  Сбросить фильтры
                </Button>
              </Paper>
            </Paper>
          </div>
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
    </Paper>
  );
};

export default ArticleList;
