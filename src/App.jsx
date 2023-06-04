import { useEffect } from "react";
import { useStore } from "effector-react";

import ArticleList from "./components/molecules/ArticleList/ArticleList";
import AddOrUpdateArticleForm from "./components/molecules/AddOrUpdateArticleForm/AddOrUpdateArticleForm";
import Button from "./components/atoms/Button/Button";
import Width from "./components/atoms/Width/Width";

import useArticleShowModal from "./hooks/useArticleShowModal";

import "./App.css";

import $store, { addArticle, setNewArticle } from "./store/store";

const App = () => {
  const articleData = [
    {
      title: 'Я помню чудное мгновенье',
      theme: 'Стихи Пушкина',
      content: 'Я помню чудное мгновенье: Передо мной явилась ты, Как мимолетное виденье, Как гений чистой красоты. В томленьях грусти безнадежной, В тревогах шумной суеты, Звучал мне долго голос нежный И снились милые черты. Шли годы. Бурь порыв мятежный Рассеял прежние мечты, И я забыл твой голос нежный, Твои небесные черты. В глуши, во мраке заточенья Тянулись тихо дни мои Без божества, без вдохновенья, Без слез, без жизни, без любви. Душе настало пробужденье: И вот опять явилась ты, Как мимолетное виденье, Как гений чистой красоты. И сердце бьется в упоенье, И для него воскресли вновь И божество, и вдохновенье, И жизнь, и слезы, и любовь.',
      author: "Александр Пушкин",
      date: "2014-06-05",
    },
    {
      title: 'Я памятник себе воздвиг нерукотворный',
      theme: 'Стихи Пушкина',
      content: 'Я памятник себе воздвиг нерукотворный, К нему не зарастет народная тропа, Вознесся выше он главою непокорной Александрийского столпа. Нет, весь я не умру — душа в заветной лире Мой прах переживет и тленья убежит — И славен буду я, доколь в подлунном мире Жив будет хоть один пиит. Слух обо мне пройдет по всей Руси великой, И назовет меня всяк сущий в ней язык, И гордый внук славян, и финн, и ныне дикой Тунгус, и друг степей калмык. И долго буду тем любезен я народу, Что чувства добрые я лирой пробуждал, Что в мой жестокий век восславил я Свободу И милость к падшим призывал. Веленью божию, о муза, будь послушна, Обиды не страшась, не требуя венца, Хвалу и клевету приемли равнодушно И не оспоривай глупца.',
      author: "Александр Пушкин",
      date: "2018-06-05",
    },
    {
      title: 'Я вас любил',
      theme: 'Стихи Бродского',
      content: 'Я вас любил. Любовь еще (возможно, что просто боль) сверлит мои мозги. Все разлетелось к черту на куски. Я застрелиться пробовал, но сложно с оружием. И далее: виски: в который вдарить? Портила не дрожь, но задумчивость. Черт! Все не по-людски! Я вас любил так сильно, безнадежно, как дай вам Бог другими — но не даст! Он, будучи на многое горазд, не сотворит — по Пармениду — дважды сей жар в крови, ширококостный хруст, чтоб пломбы в пасти плавились от жажды коснуться — «бюст» зачеркиваю — уст!',
      author: "Иосиф Бродский",
      date: "2021-06-05",
    },
    {
      title: 'Розы, герань, гиацинты',
      theme: 'Стихи Бродского',
      content: 'Розы, герань, гиацинты, пионы, сирень, ирис — на страшный их гроб из цинка — розы, герань, нарцисс, лилии, словно из басмы, запах их прян и дик, левкой, орхидеи, астры, розы и сноп гвоздик. Прошу отнести их к брегу, вверить их небесам. В реку их бросить, в реку, она понесет к лесам. К черным лесным протокам, к темным лесным домам, к мертвым полесским топям, вдаль — к балтийским холмам.',
      author: "Иосиф Бродский",
      date: "2019-06-05",
    }
  ];
  const store = useStore($store);

  useEffect(() => {
    articleData.map((article, index) => {
      setNewArticle({
        id: index,
        comment: [],
        commentText: "",
        title: article.title,
        theme: article.theme,
        content: article.content,
        author: article.author,
        date: article.date,
      });
      addArticle();
    })
  }, []);

  return (
    <div className="App">
      <Width size={45} align="center">
        <ArticleList data={store.articles} />
      </Width>
      <AddOrUpdateArticleForm />
    </div>
  );
};

export default App;
