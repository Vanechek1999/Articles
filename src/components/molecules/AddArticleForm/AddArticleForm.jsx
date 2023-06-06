import { useState, useEffect, useMemo } from "react";
import { useStore } from "effector-react";

import Paper from "../../atoms/Paper/Paper";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import Width from "../../atoms/Width/Width";
import SvgImage from "../../atoms/SvgImage/SvgImage";
import Typography from "../../atoms/Typography/Typography";

import $store, { addArticle, setNewArticle } from "../../../store/store";

import "./AddArticleForm.scss";

const AddArticleForm = () => {
  const store = useStore($store);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [themeValue, setThemeValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [validation, setValidation] = useState(false)
  const dateNow = new Date();
  const getDate = () => {
    const year = dateNow.getFullYear();
    const day =
      dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();
    const month =
      dateNow.getMonth() + 1 < 10
        ? `0${dateNow.getMonth() + 1}`
        : dateNow.getMonth() + 1;

    return `${year}-${month}-${day}`;
  };

  useMemo(() => {
    if (!titleValue | !themeValue | !contentValue | !authorValue | !dateValue) {
      setValidation(true)
      
    } else setValidation(false)
  }, [titleValue, themeValue, contentValue, authorValue, dateValue]);

  useEffect(() => {
    if (addFormVisible) {
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("AddArticleForm")) {
          setAddFormVisible(!addFormVisible);
        }
      });
    }
  }, [addFormVisible]);

  const addArticleAndCloseModal = () => {
    setNewArticle({
      id: store.articles.length | 0,
      title: titleValue,
      theme: themeValue,
      content: contentValue,
      author: authorValue,
      date: dateValue,
    });
    addArticle();
    setAddFormVisible(!addFormVisible);
  };

  return (
    <>
      <Button
        className="AddArticle-Button"
        backGround="blue"
        fullWidth
        ySpace={{ all: 20 }}
        onClick={() => setAddFormVisible(!addFormVisible)}
      >
        <Typography>Добавить статью</Typography>{" "}
      </Button>
      {addFormVisible && (
        <div className="AddArticleForm">
          <Width
            className="AddArticleForm-Card"
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
                  onClick={() => setAddFormVisible(!addFormVisible)}
                  className="AddArticle-CloseLogo"
                >
                  <SvgImage size={24} type="cross" />
                </Button>
                <label>
                  Заголовок
                  <Input
                    warning={false}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                </label>
                <Paper top={{ all: 20 }}>
                  <label>
                    Тема
                    <Input
                      warning={false}
                      onChange={(e) => setThemeValue(e.target.value)}
                    />
                  </label>
                </Paper>
                <Paper top={{ all: 20 }}>
                  <label>
                    Содержание
                    <Input
                      warning={false}
                      onChange={(e) => setContentValue(e.target.value)}
                    />
                  </label>
                </Paper>
                <Paper top={{ all: 20 }}>
                  <label>
                    Автор
                    <Input
                      warning={false}
                      onChange={(e) => setAuthorValue(e.target.value)}
                    />
                  </label>
                </Paper>
                <Paper top={{ all: 20 }}>
                  <label>
                    Дата публикации
                    <Input
                      type="date"
                      min={getDate()}
                      onChange={(e) => setDateValue(e.target.value)}
                    />
                  </label>
                </Paper>
                <Paper top={{ all: 20 }}>
                  <Button
                    disabled={validation}
                    onClick={addArticleAndCloseModal}
                  >
                    Добавить
                  </Button>
                </Paper>
              </Paper>
            </Card>
          </Width>
        </div>
      )}
    </>
  );
};

export default AddArticleForm;
