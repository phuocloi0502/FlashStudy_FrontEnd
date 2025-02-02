import { HashRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { Vocabulary } from "../pages/vocabulary/Vocabulary";
import { Grammar } from "../pages/grammar/Grammar";
import { Home } from "../pages/home/Home";
import { Kanji } from "../pages/kanji/Kanji";
import { Account } from "../pages/account/Account";
import { Blog } from "../pages/blog/Blog";
import { Chapter } from "../pages/vocabulary-des/Chapter";
import { VocabularyList } from "../pages/vocabulary_list/VocabularyList";
import { Training } from "../pages/training/Training";
import { Login } from "../pages/login/Login";
import { SignUp } from "../pages/signUp/SignUp";
import AuthLayout from "./AuthLayout";

const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route element={<AuthLayout isPublic={true} />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="tu-vung" element={<Vocabulary />} />
        <Route path="ngu-phap" element={<Grammar />} />
        <Route path="kanji" element={<Kanji />} />
        <Route element={<AuthLayout isPublic={false} />}>
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="blog" element={<Blog />} />
        <Route path="tu-vung/:vocabularyLevel" element={<Chapter />} />
        <Route
          path="tu-vung/:level/:chapterNumber/:sessionNumber"
          element={<VocabularyList />}
        />
        <Route element={<AuthLayout isPublic={false} />}>
          <Route
            path="tu-vung/:level/:chapterNumber/:sessionNumber/luyen-tap"
            element={<Training />}
          />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);

export default Router;
