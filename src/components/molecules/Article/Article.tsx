import classNames from "classnames";

import { ChangeEvent, useState, useEffect } from "react";
import { useStore } from "effector-react";

import Typography from "../../atoms/Typography/Typography";
import Paper from "../../atoms/Paper/Paper";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Width from "../../atoms/Width/Width";
import SvgImage from "../../atoms/SvgImage/SvgImage";

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
  const [showAddedComments, setShowAddedComments] = useState(false);
  const comments = store.articles[id].comment;
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
    setCommentedValue("");
  };

  useEffect(() => {
    if (editFormVisible) {
      document.addEventListener("click", (e: any) => {
        if (e.target.classList.contains("Article-EditForm")) {
          setEditFormVisible(!editFormVisible);
        }
      });
    }
  }, [editFormVisible]);

  return (
    <>
      <Card theme="blurEffect" className={classes} {...props}>
        <Paper
          top={{ all: 32 }}
          bottom={{ all: 32 }}
        >
          <Paper left={{ all: 20 }} right={{ all: 20 }}>
            <Paper align="left">
              <Typography weight={700}>Тема:</Typography>{" "}
              <Typography>{theme}</Typography>
            </Paper>
            <Paper top={{ all: 12 }} align="left">
              <Typography weight={700}>Заголовок:</Typography>{" "}
              <Typography>{title}</Typography>
            </Paper>
            <Paper top={{ all: 12 }} align="left">
              <Typography weight={700}>Содержание:</Typography>{" "}
              <Typography>{content}</Typography>
            </Paper>
            <Paper align="left" top={{ all: 20 }}>
              <Typography weight={700}>Автор:</Typography>{" "}
              <Typography>{author}</Typography>
            </Paper>
            <Paper align="left" top={{ all: 20 }}>
              <Typography weight={700}>Дата публикации:</Typography>{" "}
              <Typography>{date}</Typography>
            </Paper>
            <Paper className="Article-Buttons" display="flex" top={{ all: 20 }}>
              <Button
                onClick={() => setEditFormVisible(!editFormVisible)}
                backGround="blue"
                color="white"
                xSpace={{ all: 12 }}
                ySpace={{ all: 8 }}
              >
                Редактировать
              </Button>
              <Paper left={{ all: 20 }}>
                <Button
                  onClick={() => removeArticle()}
                  backGround="red"
                  color="white"
                  xSpace={{ all: 12 }}
                  ySpace={{ all: 8 }}
                >
                  Удалить
                </Button>
              </Paper>
            </Paper>
          </Paper>
          <Paper top={{ all: 20 }}>
            <Button onClick={() => setShowAddedComments(!showAddedComments)}>
              <div
                className={classNames(
                  "Article-Comments",
                  showAddedComments && "Article-Comments_active"
                )}
              >
                {comments.filter(Boolean).length <= 0 ? (
                  <Typography size={20}>Оставьте комментарий</Typography>
                ) : (
                  <Typography size={20}>{`Количество комментариев: ${
                    comments.filter(Boolean).length
                  }`}</Typography>
                )}
                <Paper left={{ all: 8 }}>
                  <SvgImage type="arrow" size={14} />
                </Paper>
              </div>
            </Button>
            {showAddedComments && (
              <Card>
                {comments.map((comment, index) => (
                  <Paper top={{ all: index !== 0 ? 20 : 0 }} key={index}>
                    <Typography display="block" className="Article-Comment" key={index}>{comment}</Typography>
                  </Paper>
                ))}
                <Paper center display="flex" top={{ all: 20 }} left={{ all: 20 }} right={{ all: 20}}>
                  <Input
                    value={commentedValue}
                    placeholder="Комментировать"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setCommentedValue(event.target.value)
                    }
                  />
                  <Paper left={{ all: 20 }}>
                    <Button
                      backGround="green"
                      color="white"
                      xSpace={{ all: 8 }}
                      ySpace={{ all: 12 }}
                      onClick={() => commentArticle()}
                    >
                      Отправить
                    </Button>
                  </Paper>
                </Paper>
              </Card>
            )}
          </Paper>
        </Paper>
      </Card>
      {editFormVisible && (
        <div className="Article-EditForm">
          <Width
            className="Article-Edit"
            size={50}
            mobileFullWidth
            align="center"
          >
            <Card theme="blurEffect">
              <Paper
                top={{ all: 20 }}
                right={{ all: 40 }}
                bottom={{ all: 20 }}
                left={{ all: 40 }}
              >
                <Button
                  onClick={() => setEditFormVisible(!editFormVisible)}
                  className="Article-EditCloseLogo"
                >
                  <SvgImage type="cross" size={24} />
                </Button>
                <label>
                  <Paper bottom={{ all: 12 }}>
                    <Typography align="left" display="block" weight={600}>
                      Заголовок
                    </Typography>
                  </Paper>
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
                    <Paper bottom={{ all: 12 }}>
                      <Typography align="left" display="block" weight={600}>
                        Тема
                      </Typography>
                    </Paper>
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
                    <Paper bottom={{ all: 12 }}>
                      <Typography align="left" display="block" weight={600}>
                        Содержание
                      </Typography>
                    </Paper>
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
                    <Paper bottom={{ all: 12 }}>
                      <Typography align="left" display="block" weight={600}>
                        Автор
                      </Typography>
                    </Paper>
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
                    <Paper bottom={{ all: 12 }}>
                      <Typography align="left" display="block" weight={600}>
                        Дата публикации
                      </Typography>
                    </Paper>
                    <Input
                      value={dateValue}
                      type="date"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setDateValue(event.target.value)
                      }
                    />
                  </label>
                </Paper>
                <Width align="center" size={15}>
                  <Paper top={{ all: 20 }}>
                    <Button fullWidth backGround="blue" color="white" xSpace={{ all: 20 }} ySpace={{ all: 12 }} onClick={updateArticle}>Готово</Button>
                  </Paper>
                </Width>
              </Paper>
            </Card>
          </Width>
        </div>
      )}
    </>
  );
};

export default Article;
