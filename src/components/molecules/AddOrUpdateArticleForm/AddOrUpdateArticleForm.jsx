import { useState, useMemo, useEffect } from "react";
import { useStore } from "effector-react";

import Paper from "../../atoms/Paper/Paper";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import Width from "../../atoms/Width/Width";

import useArticleShowModal from "../../../hooks/useArticleShowModal";

import $store, { addArticle, setNewArticle, update } from "../../../store/store";

const AddOrUpdateArticleForm = ({ id, isUpdate = false}) => {
  const store = useStore($store);
  const [titleValue, setTitleValue] = useState(isUpdate ? store.articles[id]  :"");
  const [themeValue, setThemeValue] = useState(isUpdate ? store.articles[id]  :"");
  const [contentValue, setContentValue] = useState(isUpdate ? store.articles[id]  :"");
  const [authorValue, setAuthorValue] = useState(isUpdate ? store.articles[id]  :"");
  const [dateValue, setDateValue] = useState(isUpdate ? store.articles[id]  :"");
  const { isModalOpen, handleModalOpen, handleModalClose } =
    useArticleShowModal();


  useMemo(() => {
    console.log(store);
    setNewArticle({
      id: store.articles.length | 0,
      title: titleValue,
      theme: themeValue,
      content: contentValue,
      author: authorValue,
      date: dateValue,
    });
  }, [titleValue, themeValue, contentValue, authorValue, dateValue]);

  const addArticleAndCloseModal = () => {
    addArticle();
    handleModalClose();
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Добавить статью</Button>
      {isModalOpen && (
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
                    tag="textArea"
                    warning={false}
                    onChange={(e) => setContentValue(e.target.value)}
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <label>
                  Автор
                  <Input
                    type="textArea"
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
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                </label>
              </Paper>
              <Paper top={{ all: 20 }}>
                <Button onClick={addArticleAndCloseModal}>Send</Button>
              </Paper>
            </Paper>
          </Card>
        </Width>
      )}
    </>
  );
};

export default AddOrUpdateArticleForm;
