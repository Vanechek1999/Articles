import { ChangeEvent, useState } from "react";
import { useStore } from "effector-react";

import classNames from "classnames";

import Typography from "../../atoms/Typography/Typography";
import Paper from "../../atoms/Paper/Paper";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Width from "../../atoms/Width/Width";

import $store, { remove, update, comment } from "../../../store/store";

import "./Article.scss";

type ArticleProps = {
  id: number;
  title: string;
  theme: string;
  content: string;
  author: string;
  date: string;
  className?: string;
};

const Article = ({
  id,
  title,
  theme,
  content,
  author,
  date,
  className,
  ...props
}: ArticleProps) => {
  const store = useStore($store);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [titleValue, setTitleValue] = useState(store.articles[id].title);
  const [themeValue, setThemeValue] = useState(store.articles[id].theme);
  const [contentValue, setContentValue] = useState(store.articles[id].content);
  const [authorValue, setAuthorValue] = useState(store.articles[id].author);
  const [dateValue, setDateValue] = useState(store.articles[id].date);
  const [commentedValue, setCommentedValue] = useState("");
  const [comments, setComments] = useState(store.articles[id].comment);
  const classes = classNames(className, "Article");

  const removeArticle = () => {
    remove(id);
  };

  const updateArticle = () => {
    update({
      id: id,
      comment: [],
      commentText: "",
      title: titleValue,
      theme: themeValue,
      content: contentValue,
      author: authorValue,
      date: dateValue,
      isVisible: true,
    });
    setEditFormVisible(!editFormVisible);
    
  };

  const commentArticle = () => {
    comment({
      id: id,
      commentText: commentedValue,
      comment: [],
      title: titleValue,
      theme: themeValue,
      content: contentValue,
      author: authorValue,
      date: dateValue,
      isVisible: true,
    });
  };

  return (
    <>
      <Card theme="blurEffect" className={classes} {...props}>
        <Paper
          top={{ all: 20 }}
          right={{ all: 12 }}
          bottom={{ all: 20 }}
          left={{ all: 12 }}
        >
          <Typography>{`Заголовок: ${title}`}</Typography>
          <Paper top={{ all: 12 }}>
            <Typography>{`Тема: ${theme}`}</Typography>
          </Paper>
          <Paper top={{ all: 12 }}>
            <Typography>{`Содержание: ${content}`}</Typography>
          </Paper>
          <Paper display="flex">
            <Typography>{`Автор: ${author}`}</Typography>
            <Paper left={{ all: 20 }}>
            <Typography>{`Дата публикации: ${date}`}</Typography>
          </Paper>
          </Paper>
          <Paper center display="flex" top={{ all: 20 }}>
            <Button
              onClick={() => setEditFormVisible(!editFormVisible)}
              backGround="blue"
              xSpace={{ all: 12 }}
              ySpace={{ all: 8 }}
            >
              Редактировать
            </Button>
            <Paper left={{ all: 20 }}>
              <Button
                onClick={() => removeArticle()}
                backGround="red"
                xSpace={{ all: 12 }}
                ySpace={{ all: 8 }}
              >
                Удалить
              </Button>
            </Paper>
          </Paper>
          <Paper top={{ all: 20 }}>
            <Typography>Комментарии:</Typography>{" "}
            {!!comments && (
              <Card>
                {comments.map((comment, index) => (
                  <Paper top={{ all: index !== 0 ? 20 : 0 }} key={index}>
                    <Typography key={index}>{comment}</Typography>
                  </Paper>
                ))}
              </Card>
            )}
          </Paper>
          <Paper center display="flex" top={{ all: 20 }}>
            <Input
              value={commentedValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCommentedValue(event.target.value)
              }
            />
            <Paper left={{ all: 20 }}>
              <Button
                backGround="green"
                xSpace={{ all: 8 }}
                ySpace={{ all: 12 }}
                onClick={() => commentArticle()}
              >
                Комментировать
              </Button>
            </Paper>
          </Paper>
        </Paper>
      </Card>
      {editFormVisible && (
        <Width size={50} mobileFullWidth align="center">
          <Card theme="blurEffect">
            <Paper
              top={{ all: 20 }}
              right={{ all: 40 }}
              bottom={{ all: 20 }}
              left={{ all: 40 }}
            >
              <label>
                Заголовок
                <Input
                  warning={false}
                  value={titleValue}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTitleValue(event.target.value)
                  }
                />
              </label>
              <Paper top={{ all: 20 }}>
                <label>
                  Тема
                  <Input
                    value={themeValue}
                    warning={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setThemeValue(event.target.value)
                    }
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <label>
                  Содержание
                  <Input
                    value={contentValue}
                    warning={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setContentValue(event.target.value)
                    }
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <label>
                  Автор
                  <Input
                    value={authorValue}
                    warning={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setAuthorValue(event.target.value)
                    }
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <label>
                  Дата публикации
                  <Input
                    value={dateValue}
                    type="date"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setDateValue(event.target.value)
                    }
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <Button onClick={updateArticle}>Готово</Button>
              </Paper>
            </Paper>
          </Card>
        </Width>
      )}
    </>
  );
};

export default Article;
